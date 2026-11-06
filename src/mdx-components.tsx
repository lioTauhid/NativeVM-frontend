import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { Facts, Screenshot, Steps } from "@/components/docs/doc-parts";

/** h2 and h3 get a "#" link to themselves, shown on hover. */
function AnchoredH2({ id, children, ...props }: ComponentProps<"h2">) {
  return (
    <h2 id={id} {...props}>
      {children}
      {id ? <a href={`#${id}`} className="heading-anchor" aria-label="Link to this section" /> : null}
    </h2>
  );
}

function AnchoredH3({ id, children, ...props }: ComponentProps<"h3">) {
  return (
    <h3 id={id} {...props}>
      {children}
      {id ? <a href={`#${id}`} className="heading-anchor" aria-label="Link to this section" /> : null}
    </h3>
  );
}

/** Links inside the site navigate client-side; others open in a new tab. */
function DocLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  );
}

const components: MDXComponents = {
  h2: AnchoredH2,
  h3: AnchoredH3,
  a: DocLink,
  pre: CodeBlock,
  table: Table,
  Callout,
  Steps,
  Screenshot,
  Facts,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
