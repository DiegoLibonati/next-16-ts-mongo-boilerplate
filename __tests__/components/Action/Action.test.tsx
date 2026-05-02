import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ActionProps } from "@/types/props";

import Action from "@/components/Action/Action";

const mockOnClick: jest.Mock = jest.fn();

const renderComponent = (props: Partial<ActionProps> = {}): RenderResult => {
  const defaultProps: ActionProps = {
    onClick: mockOnClick,
    children: "Click me",
    ...props,
  };
  return render(<Action {...defaultProps} />);
};

describe("Action", () => {
  describe("rendering", () => {
    it("should render children", () => {
      renderComponent({ children: "Test Label" });
      expect(screen.getByRole("button", { name: "Test Label" })).toBeInTheDocument();
    });

    it("should always apply action class", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("action");
    });

    it("should apply additional className alongside action class", () => {
      renderComponent({ className: "custom-class" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("action");
      expect(button).toHaveClass("custom-class");
    });

    it("should apply aria-label when provided", () => {
      renderComponent({ ariaLabel: "accessible label" });
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "accessible label");
    });

    it("should apply id when provided", () => {
      renderComponent({ id: "my-button" });
      expect(screen.getByRole("button")).toHaveAttribute("id", "my-button");
    });

    it("should render as a button with type button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not throw when onClick is not provided", async () => {
      const user = userEvent.setup();
      renderComponent({ onClick: undefined! });
      await expect(user.click(screen.getByRole("button"))).resolves.not.toThrow();
    });
  });

  describe("edge cases", () => {
    it("should render without className when not provided", () => {
      renderComponent({ className: undefined! });
      const button = screen.getByRole("button");
      expect(button.className).toBe("action");
    });

    it("should render without id when not provided", () => {
      renderComponent({ id: undefined! });
      expect(screen.getByRole("button")).not.toHaveAttribute("id");
    });
  });
});
