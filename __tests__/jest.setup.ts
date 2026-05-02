import { createElement } from "react";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import "@testing-library/jest-dom";

jest.mock("next/link", () => ({
  __esModule: true,
  default: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }
  ): ReturnType<typeof createElement> => {
    const { href, children, ...rest } = props;
    return createElement("a", { href, ...rest }, children);
  },
}));
