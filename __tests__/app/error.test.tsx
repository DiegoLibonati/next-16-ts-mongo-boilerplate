import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ErrorPageProps } from "@/types/props";

import ErrorPage from "@/app/error";

const mockReset = jest.fn();

const renderComponent = (props: Partial<ErrorPageProps> = {}): RenderResult => {
  const defaultProps: ErrorPageProps = {
    error: new Error("Test error"),
    reset: mockReset,
    ...props,
  };
  return render(<ErrorPage {...defaultProps} />);
};

describe("error", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {
      // Empty fn
    });
  });

  describe("rendering", () => {
    it("should render the error heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    });

    it("should render the try again button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call reset when the try again button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Try again" }));
      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it("should log the error to the console on mount", () => {
      const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => undefined);
      const testError = new Error("Something broke");
      renderComponent({ error: testError });
      expect(mockConsoleError).toHaveBeenCalledWith(testError);
    });
  });
});
