import NextLink from "next/link";

import type { JSX } from "react";
import type { LinkProps } from "@/types/props";

import "@/components/Link/Link.css";

const Link = ({
  id,
  href,
  target = "_self",
  ariaLabel,
  children,
  className,
}: LinkProps): JSX.Element => {
  const isExternal = target === "_blank";

  return (
    <NextLink
      id={id}
      href={href}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={["link", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
};

export default Link;
