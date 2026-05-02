import { render, screen } from "@testing-library/react";

import AboutPage from "@/app/(pages)/about/page";

const renderPage = (): void => {
  render(<AboutPage />);
};

describe("page", () => {
  describe("rendering", () => {
    it("should render the about heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    });

    it("should render the home navigation link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "← Home" })).toBeInTheDocument();
    });

    it("should link home to the root path", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute("href", "/");
    });
  });
});
