import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import { ProductService } from "@/server/services/product.service";
import { getSession } from "@/server/helpers/get_session.helper";

import ProductsPage from "@/app/(pages)/products/page";

import { mockProduct, mockProducts } from "@tests/__mocks__/product.mock";
import { mockSession } from "@tests/__mocks__/session.mock";

jest.mock("@/server/helpers/get_session.helper", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/server/services/product.service", () => ({
  ProductService: {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  redirect: jest.fn(),
}));

const renderPage = async (): Promise<void> => {
  const ui = await ProductsPage();
  render(ui);
};

beforeEach(() => {
  (redirect as unknown as jest.Mock).mockImplementation((url: string): never => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  });
});

describe("page", () => {
  describe("when the user is logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(mockSession);
    });

    describe("when products exist", () => {
      beforeEach(() => {
        jest.mocked(ProductService.getAllProducts).mockResolvedValue(mockProducts);
      });

      it("should render the products heading", async () => {
        await renderPage();
        expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();
      });

      it("should render a link for each product", async () => {
        await renderPage();
        const productLinks = screen
          .getAllByRole("link")
          .filter((l) => l.getAttribute("href")?.startsWith("/products/"));
        expect(productLinks).toHaveLength(mockProducts.length);
      });

      it("should render the first product name", async () => {
        await renderPage();
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      });

      it("should render the first product price", async () => {
        await renderPage();
        expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
      });

      it("should render the home navigation link", async () => {
        await renderPage();
        expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute("href", "/");
      });
    });

    describe("when no products exist", () => {
      beforeEach(() => {
        jest.mocked(ProductService.getAllProducts).mockResolvedValue([]);
      });

      it("should render the empty state message", async () => {
        await renderPage();
        expect(screen.getByText("No products found.")).toBeInTheDocument();
      });

      it("should not render any product links", async () => {
        await renderPage();
        const productLinks = screen
          .queryAllByRole("link")
          .filter((l) => l.getAttribute("href")?.startsWith("/products/"));
        expect(productLinks).toHaveLength(0);
      });
    });

    describe("when the service throws an error", () => {
      beforeEach(() => {
        jest.mocked(ProductService.getAllProducts).mockRejectedValue(new Error("Service error"));
      });

      it("should render the error message", async () => {
        await renderPage();
        expect(screen.getByText("Service error")).toBeInTheDocument();
      });

      it("should not render product links when an error occurs", async () => {
        await renderPage();
        const productLinks = screen
          .queryAllByRole("link")
          .filter((l) => l.getAttribute("href")?.startsWith("/products/"));
        expect(productLinks).toHaveLength(0);
      });
    });
  });

  describe("when the user is not logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(null);
    });

    it("should redirect to the login page", async () => {
      await expect(ProductsPage()).rejects.toThrow("NEXT_REDIRECT:/login");
    });
  });
});
