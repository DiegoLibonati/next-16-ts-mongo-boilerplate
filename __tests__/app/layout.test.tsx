import { render, screen } from "@testing-library/react";

import type { ReactNode } from "react";

import RootLayout from "@/app/layout";

const renderLayout = (
  children: ReactNode = <div data-testid="children">Page content</div>
): void => {
  render(<RootLayout>{children}</RootLayout>);
};

describe("layout", () => {
  describe("rendering", () => {
    it("should render the children", () => {
      renderLayout();
      expect(screen.getByTestId("children")).toBeInTheDocument();
    });

    it("should render custom children content", () => {
      renderLayout(<main role="main">App content</main>);
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByText("App content")).toBeInTheDocument();
    });

    it("should render multiple children", () => {
      renderLayout(
        <>
          <div data-testid="first">First</div>
          <div data-testid="second">Second</div>
        </>
      );
      expect(screen.getByTestId("first")).toBeInTheDocument();
      expect(screen.getByTestId("second")).toBeInTheDocument();
    });
  });
});
