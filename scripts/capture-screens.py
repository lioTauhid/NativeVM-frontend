"""Capture real Native VM windows for the website, over the app's test rig.

Runs the desktop app's own window, model and screens offscreen. The server is the panel
rig's fixed sample (kestrel-prod-01, in tests/panel_rig.py): nothing connects anywhere,
the keychain is an in-memory stand-in, and the data folder is a temporary directory.
Nothing is written into the app's repository.

Run it with the app's own virtualenv, from the app's repository:

    cd ../NativePanel
    PYTHONDONTWRITEBYTECODE=1 QT_QPA_PLATFORM=offscreen QT_SCALE_FACTOR=2 \
      .venv/bin/python <this site>/scripts/capture-screens.py <this site>/src/assets/screenshots

NATIVEVM_APP points at the app's repository when it is not the current directory.
SHOT_W and SHOT_H set the window size in points (default 1280x800, drawn at 2x).
"""

from __future__ import annotations

import math
import os
import sys
import tempfile
from datetime import UTC, datetime, timedelta
from pathlib import Path

sys.dont_write_bytecode = True
os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

ROOT = Path(os.environ.get("NATIVEVM_APP", Path.cwd())).resolve()
sys.path.insert(0, str(ROOT / "tests"))
sys.path.insert(0, str(ROOT / "src"))

from PySide6 import QtWebEngineWidgets  # noqa: E402,F401  (before any QApplication)
from PySide6.QtTest import QTest  # noqa: E402
from PySide6.QtWidgets import QApplication, QWidget  # noqa: E402

app = QApplication(sys.argv[:1])

from account_rig import AccountServer  # noqa: E402
from conftest import InMemorySecrets, pump_until  # noqa: E402
from panel_rig import (  # noqa: E402
    GB,
    HOST,
    sample_dns,
    sample_metrics,
    sample_snapshot,
)

from nativevm.app import build_services, build_windows  # noqa: E402
from nativevm.core.apps import AppStatus  # noqa: E402
from nativevm.core.metrics import (  # noqa: E402
    CpuSample,
    InterfaceSample,
    MemorySample,
    MetricsSample,
)
from nativevm.core.models import AuthMethod, ConnectionState, ServerStatus  # noqa: E402
from nativevm.core.plan import Plan  # noqa: E402
from nativevm.services.connections import ServerForm  # noqa: E402
from nativevm.services.overview import AppDetail  # noqa: E402
from nativevm.ui import theme  # noqa: E402
from nativevm.ui.screens import base  # noqa: E402

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
WIDTH, HEIGHT = int(os.environ.get("SHOT_W", "1280")), int(os.environ.get("SHOT_H", "800"))


def settle(seconds: float = 0.8) -> None:
    pump_until(app, lambda: False, seconds)


def grab(widget: QWidget, name: str) -> None:
    settle()
    pixmap = widget.grab()
    path = OUT / f"{name}.png"
    pixmap.save(str(path), "PNG")
    print(f"saved {path} {pixmap.width()}x{pixmap.height()} dpr={pixmap.devicePixelRatio()}")


def history(server_id: str) -> list[MetricsSample]:
    """Forty minutes of believable samples, one a minute, so the sparklines have bars."""
    now = datetime.now(UTC)
    samples = []
    for minute in range(40, 0, -1):
        wave = math.sin(minute / 4.0) * 9 + math.sin(minute / 1.7) * 4
        cpu = max(4.0, 22.0 + wave)
        rx = max(0.4, 9.0 + math.cos(minute / 3.0) * 5 + math.sin(minute / 1.3) * 2) * 1024**2
        tx = rx / 3.4
        samples.append(
            MetricsSample(
                server_id,
                now - timedelta(minutes=minute),
                CpuSample(cpu, (cpu - 3, cpu + 2, cpu - 1, cpu + 2)),
                MemorySample(total=8 * GB, available=int((4.4 + math.sin(minute / 6) * 0.3) * GB)),
                interfaces=(InterfaceSample("eth0", 10**9, 10**8, rx, tx),),
                poll_ms=18,
                has_rates=True,
            )
        )
    return samples


def main() -> None:
    theme.install(app)
    account = AccountServer()
    account.start()
    tmp = Path(tempfile.mkdtemp(prefix="nvm-shots-"))
    services = build_services(
        tmp / "data", secret_backend=InMemorySecrets(), ssh_config=tmp / "none"
    )
    services.account.grant(Plan.PRO)

    record = services.connections.save_server(
        ServerForm(
            "kestrel-prod-01", HOST, 22, "deploy", AuthMethod.PASSWORD, password="x",
            tags=("Kestrel",),
        )
    )
    for name, host, user, tag in (
        ("kestrel-staging", "203.0.113.41", "deploy", "Kestrel"),
        ("kestrel-worker-02", "203.0.113.57", "deploy", "Kestrel"),
        ("blog-vps", "198.51.100.12", "root", "Personal"),
    ):
        services.connections.save_server(
            ServerForm(name, host, 22, user, AuthMethod.PASSWORD, password="x", tags=(tag,))
        )

    real_status = services.connections.status

    def status(server_id: str) -> ServerStatus:
        if server_id == record.id:
            return ServerStatus(server_id, ConnectionState.CONNECTED)
        return real_status(server_id)

    async def snapshot(server_id: str):  # type: ignore[no-untyped-def]
        return sample_snapshot(server_id)

    async def poll(server_id: str) -> MetricsSample:
        return sample_metrics(server_id)

    async def check_dns(server_id: str, names: tuple[str, ...]):  # type: ignore[no-untyped-def]
        return sample_dns()

    async def app_detail(server_id: str, name: str) -> AppDetail:
        return AppDetail(sample_snapshot(server_id).app(name) or AppStatus(name))

    services.connections.status = status  # type: ignore[method-assign]
    services.state.snapshot = snapshot  # type: ignore[method-assign]
    services.state.check_dns = check_dns  # type: ignore[method-assign]
    services.state.app_detail = app_detail  # type: ignore[method-assign]
    services.monitoring.poll = poll  # type: ignore[method-assign]

    for sample in history(record.id):
        services.metrics.append(sample)

    # The app page's live output: a believable gunicorn journal, then quiet.
    import asyncio  # noqa: PLC0415

    from nativevm.core.systemd import LogEntry, Priority  # noqa: PLC0415
    from nativevm.services.logs import LogBatch  # noqa: PLC0415

    warning = getattr(Priority, "WARNING", Priority.INFO)
    now = datetime.now(UTC)
    journal_lines = [
        ("[INFO] Starting gunicorn 23.0.0", Priority.INFO, 312),
        ("[INFO] Listening at: http://127.0.0.1:8001 (48211)", Priority.INFO, 311),
        ("[INFO] Using worker: uvicorn.workers.UvicornWorker", Priority.INFO, 311),
        ("[INFO] Booting worker with pid: 48214", Priority.INFO, 310),
        ("[INFO] Booting worker with pid: 48215", Priority.INFO, 310),
        ("[INFO] Application startup complete.", Priority.INFO, 309),
        ('127.0.0.1:51244 - "GET /health HTTP/1.1" 200', Priority.INFO, 240),
        ('127.0.0.1:51250 - "GET /v1/products?category=outdoor HTTP/1.1" 200', Priority.INFO, 182),
        ('127.0.0.1:51262 - "POST /v1/cart/items HTTP/1.1" 201', Priority.INFO, 121),
        ('127.0.0.1:51270 - "GET /v1/products/8812 HTTP/1.1" 200', Priority.INFO, 96),
        ("Slow query: product search took 812 ms", warning, 74),
        ('127.0.0.1:51288 - "GET /v1/orders/10442 HTTP/1.1" 200', Priority.INFO, 41),
        ('127.0.0.1:51301 - "POST /v1/checkout HTTP/1.1" 201', Priority.INFO, 12),
        ('127.0.0.1:51309 - "GET /health HTTP/1.1" 200', Priority.INFO, 3),
    ]
    entries = tuple(
        LogEntry(text, priority, now - timedelta(seconds=ago), unit="kestrel-api.service")
        for text, priority, ago in journal_lines
    )

    def journal(server_id: str, unit: str | None, *, on_batch, backlog=0, buffer=None):  # type: ignore[no-untyped-def]
        class Stream:
            running = True

            async def run(self) -> None:
                on_batch(LogBatch(entries))
                await asyncio.sleep(300)

            async def stop(self) -> None:
                return None

        stream = Stream()
        stream.unit = unit  # type: ignore[attr-defined]
        return stream

    services.monitoring.journal = journal  # type: ignore[method-assign]

    # A redeploy that streams the agent's own progress lines, then keeps building.
    deploy_lines = [
        "Fetching https://github.com/kestrel/api.git (main)",
        "From https://github.com/kestrel/api",
        "   9f2c1ab..4e81d07  main       -> main",
        "Exporting 4e81d07 into /srv/kestrel-api/releases/20261106T091512Z-4e81d07",
        "Linking shared/.env into the release",
        "$ uv sync --frozen --python 3.12",
        "Using CPython 3.12.12",
        "Creating virtual environment at: .venv",
        "Resolved 38 packages in 4ms",
        "Prepared 6 packages in 1.21s",
        "Installed 38 packages in 96ms",
        " + fastapi==0.121.0",
        " + gunicorn==23.0.0",
        " + sqlalchemy==2.0.44",
        " + uvicorn==0.38.0",
    ]

    async def redeploy(server_id: str, name: str, *, on_line=None):  # type: ignore[no-untyped-def]
        for line in deploy_lines:
            if on_line is not None:
                on_line(line)
            await asyncio.sleep(0.05)
        await asyncio.sleep(300)

    services.deploy.redeploy = redeploy  # type: ignore[method-assign]

    windows = build_windows(services, endpoints=account.endpoints)

    # The account window, as a new install opens on it.
    try:
        windows.start()
        settle(1.2)
        for top in QApplication.topLevelWidgets():
            if top.isVisible() and top.width() > 300:
                grab(top, "sign-in")
                top.hide()
                break
    except Exception as error:  # noqa: BLE001
        print("sign-in capture skipped:", error)

    window = windows.open_launcher()
    window.resize(WIDTH, HEIGHT)
    window.show()
    QTest.qWaitForWindowExposed(window)
    grab(window, "launcher")

    windows.mark_checked(record.id)
    window.enter_server(record)
    pump_until(app, lambda: window.model.snapshot is not None and window.model.sample is not None)
    window.activateWindow()

    window.view.set_advanced(True)
    window.go(base.OVERVIEW)
    grab(window, "overview")

    window.go(base.APPS)
    grab(window, "apps")

    window.open_app("kestrel-api", "deploys")
    grab(window, "app-deploys")

    window.open_app("kestrel-api", "overview")
    grab(window, "app-overview")

    window.go(base.DOMAINS)
    grab(window, "domains")

    window.go(base.SSL)
    grab(window, "ssl")

    # Services: the rig's report, with Advanced mode's "All services".
    try:
        from test_screens import stub_services  # noqa: PLC0415

        class _Panel:  # the two attributes stub_services touches
            def __init__(self) -> None:
                self.services = services

                class _MP:
                    @staticmethod
                    def setattr(target: object, name: str, value: object) -> None:
                        setattr(target, name, value)

                self.monkeypatch = _MP()

            def record_calls(self, target: object, name: str, result: object = None) -> None:
                async def recorded(*args: object, **kwargs: object) -> object:
                    return result

                setattr(target, name, recorded)

        stub_services(_Panel())  # type: ignore[arg-type]
        window.go(base.SERVICES)
        settle(1.5)
        grab(window, "services")
    except Exception as error:  # noqa: BLE001
        print("services capture skipped:", error)

    # Cron jobs.
    try:
        from test_cron_ui import job  # noqa: PLC0415

        jobs = (
            job("nightly-backup", "0 2 * * *", "/usr/local/bin/backup --to s3://kestrel-backups"),
            job("clear-sessions", "@daily", "python manage.py clearsessions"),
            job("digest-email", "*/30 8-18 * * mon-fri", "npm run digest"),
            job("rotate-uploads", "15 4 * * sun", "find /srv/uploads -mtime +30 -delete",
                enabled=False),
        )

        async def listing(server_id: str):  # type: ignore[no-untyped-def]
            return jobs

        services.cron.jobs = listing  # type: ignore[method-assign]
        window.go(base.CRON)
        settle(1.5)
        grab(window, "cron")
    except Exception as error:  # noqa: BLE001
        print("cron capture skipped:", error)

    # A redeploy in progress, on the app's Deploys tab.
    try:
        window.open_app("kestrel-api", "deploys")
        settle(0.5)
        window.app_page().deploy()
        settle(2.0)
        grab(window, "app-deploying")
    except Exception as error:  # noqa: BLE001
        print("deploy capture skipped:", error)

    # The new app wizard's framework grid.
    window.go(base.APPS)
    settle(0.4)
    window.new_app()
    grab(window, "new-app")
    window.close()
    settle(0.3)
    services.shutdown()
    account.close()


if __name__ == "__main__":
    main()
