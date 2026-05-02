import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { UserCardProps } from "@/types/props";

import UserCard from "@/components/UserCard/UserCard";

const renderComponent = (props: Partial<UserCardProps> = {}): RenderResult => {
  const defaultProps: UserCardProps = {
    name: "Alice Example",
    email: "alice@example.com",
    ...props,
  };
  return render(<UserCard {...defaultProps} />);
};

describe("UserCard", () => {
  describe("rendering", () => {
    it("should render the user name", () => {
      renderComponent();
      expect(screen.getByText("Alice Example")).toBeInTheDocument();
    });

    it("should render the user email as a mailto link", () => {
      renderComponent();
      const link = screen.getByRole("link", { name: "alice@example.com" });
      expect(link).toHaveAttribute("href", "mailto:alice@example.com");
    });

    it("should render with article role and correct aria-label", () => {
      renderComponent({ name: "Bob Example" });
      expect(screen.getByRole("article", { name: "Profile of Bob Example" })).toBeInTheDocument();
    });

    it("should render a different name and email when provided", () => {
      renderComponent({ name: "Bob Example", email: "bob@example.com" });
      expect(screen.getByText("Bob Example")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "bob@example.com" })).toHaveAttribute(
        "href",
        "mailto:bob@example.com"
      );
    });
  });

  describe("accessibility", () => {
    it("should have user-card class on article element", () => {
      renderComponent();
      expect(screen.getByRole("article")).toHaveClass("user-card");
    });
  });
});
