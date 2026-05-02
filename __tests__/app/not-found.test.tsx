import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import NotFound from "@/app/not-found";

jest.mock("next/navigation", () => ({
  __esModule: true,
  redirect: jest.fn(),
}));

const renderPage = (): void => {
  render(<NotFound />);
};

beforeEach(() => {
  (redirect as unknown as jest.Mock).mockImplementation((url: string): never => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  });
  delete process.env.NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS;
});

describe("not-found", () => {
  describe("when NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS is not set", () => {
    it("should render the 404 heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    });

    it("should render the page not found description", () => {
      renderPage();
      expect(screen.getByText("Page not found.")).toBeInTheDocument();
    });

    it("should render a link to the home page", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/");
    });
  });

  describe("when NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS is true", () => {
    it("should redirect to the home page", () => {
      process.env.NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS = "true";
      expect(() => {
        renderPage();
      }).toThrow("NEXT_REDIRECT:/");
    });

    it("should not render the 404 heading", () => {
      process.env.NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS = "true";
      try {
        renderPage();
      } catch {
        // redirect throws — expected
      }
      expect(screen.queryByRole("heading", { name: "404" })).not.toBeInTheDocument();
    });
  });

  describe("when NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS is false", () => {
    it("should render the 404 page without redirecting", () => {
      process.env.NEXT_REDIRECT_IF_ROUTE_NOT_EXISTS = "false";
      renderPage();
      expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    });
  });
});
