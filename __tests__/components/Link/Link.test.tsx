import { render, screen } from "@testing-library/react";

import type { ComponentProps, JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { LinkProps } from "@/types/props";

import Link from "@/components/Link/Link";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, ...props }: ComponentProps<"a">): JSX.Element => (
    <a {...props}>{children}</a>
  ),
}));

const renderComponent = (
  props: Partial<LinkProps> & Pick<LinkProps, "href"> = { href: "/home" }
): RenderResult => {
  const defaultProps: LinkProps = {
    children: "Link text",
    ...props,
  };
  return render(<Link {...defaultProps} />);
};

describe("Link", () => {
  describe("rendering", () => {
    it("should render children", () => {
      renderComponent({ href: "/home", children: "Go home" });
      expect(screen.getByRole("link", { name: "Go home" })).toBeInTheDocument();
    });

    it("should render with correct href", () => {
      renderComponent({ href: "/about" });
      expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
    });

    it("should always apply link class", () => {
      renderComponent({ href: "/home" });
      expect(screen.getByRole("link")).toHaveClass("link");
    });

    it("should apply additional className alongside link class", () => {
      renderComponent({ href: "/home", className: "nav-link" });
      const link = screen.getByRole("link");
      expect(link).toHaveClass("link");
      expect(link).toHaveClass("nav-link");
    });

    it("should apply aria-label when provided", () => {
      renderComponent({ href: "/home", ariaLabel: "Go to home page" });
      expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Go to home page");
    });

    it("should apply id when provided", () => {
      renderComponent({ href: "/home", id: "nav-home" });
      expect(screen.getByRole("link")).toHaveAttribute("id", "nav-home");
    });
  });

  describe("internal links (_self)", () => {
    it("should render with _self target by default", () => {
      renderComponent({ href: "/home" });
      expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
    });

    it("should not have rel attribute for internal links", () => {
      renderComponent({ href: "/home", target: "_self" });
      expect(screen.getByRole("link")).not.toHaveAttribute("rel");
    });
  });

  describe("external links (_blank)", () => {
    it("should render with _blank target when provided", () => {
      renderComponent({ href: "https://example.com", target: "_blank" });
      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("should have rel=noopener noreferrer for external links", () => {
      renderComponent({ href: "https://example.com", target: "_blank" });
      expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
