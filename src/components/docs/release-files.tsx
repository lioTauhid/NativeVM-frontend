import { CodeBlock } from "@/components/docs/code-block";
import { getRelease } from "@/lib/get-release";
import { installFiles } from "@/lib/release";

/**
 * The current release's files, named in docs pages the way the Download page names them,
 * so both follow each release. <ReleaseFile name="dmg" /> is inline code.
 */
export async function ReleaseFile({ name }: { name: "dmg" | "installer" | "deb" }) {
  const files = installFiles(await getRelease());
  return <code>{files[name]}</code>;
}

/** The Terminal command that installs the current release's Debian package. */
export async function AptInstall() {
  const { deb } = installFiles(await getRelease());
  return (
    <CodeBlock fence="bash">
      <code>{`sudo apt install ./${deb}`}</code>
    </CodeBlock>
  );
}
