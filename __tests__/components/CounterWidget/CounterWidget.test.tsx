import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import CounterWidget from "@/components/CounterWidget/CounterWidget";

const renderComponent = (): RenderResult => {
  return render(<CounterWidget />);
};

describe("CounterWidget", () => {
  describe("rendering", () => {
    it("should render initial counter value of 0", () => {
      renderComponent();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should render increment button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    });

    it("should render decrement button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should increment counter by 1 when increment button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should decrement counter by 1 when decrement button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Decrement" }));
      expect(screen.getByText("-1")).toBeInTheDocument();
    });

    it("should handle multiple increments", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Increment" }));
      await user.click(screen.getByRole("button", { name: "Increment" }));
      await user.click(screen.getByRole("button", { name: "Increment" }));
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should handle mixed increment and decrement operations", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Increment" }));
      await user.click(screen.getByRole("button", { name: "Increment" }));
      await user.click(screen.getByRole("button", { name: "Decrement" }));
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });
});
