import { render, screen } from "@testing-library/react";

import ContextPage from "@/app/(pages)/context-demo/page";

const renderPage = (): void => {
  render(<ContextPage />);
};

describe("page", () => {
  describe("rendering", () => {
    it("should render the context demo heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Context Demo" })).toBeInTheDocument();
    });

    it("should render the counter widget", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
    });

    it("should render the initial counter value as zero", () => {
      renderPage();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should render the home navigation link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute("href", "/");
    });
  });
});
