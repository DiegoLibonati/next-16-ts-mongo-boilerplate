import { render, screen } from "@testing-library/react";
import { redirect, notFound } from "next/navigation";

import type { Metadata } from "next";
import type { ProductPageProps } from "@/types/props";

import { getSession } from "@/server/helpers/get_session.helper";
import { ProductService } from "@/server/services/product.service";

import ProductPage, { generateMetadata } from "@/app/(pages)/products/[id]/page";

import { mockProduct } from "@tests/__mocks__/product.mock";
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
  notFound: jest.fn(),
}));

const buildProps = (id: string = mockProduct._id): ProductPageProps => ({
  params: Promise.resolve({ id }),
});

const renderPage = async (id: string = mockProduct._id): Promise<void> => {
  const ui = await ProductPage(buildProps(id));
  render(ui);
};

beforeEach(() => {
  (redirect as unknown as jest.Mock).mockImplementation((url: string): never => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  });
  (notFound as unknown as jest.Mock).mockImplementation((): never => {
    throw new Error("NEXT_NOT_FOUND");
  });
});

describe("page", () => {
  describe("when the user is logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(mockSession);
    });

    describe("when the product exists", () => {
      beforeEach(() => {
        jest.mocked(ProductService.getProductById).mockResolvedValue(mockProduct);
      });

      it("should render the product name as heading", async () => {
        await renderPage();
        expect(screen.getByRole("heading", { name: mockProduct.name })).toBeInTheDocument();
      });

      it("should render the product description", async () => {
        await renderPage();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      });

      it("should render the product price", async () => {
        await renderPage();
        expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
      });

      it("should render the back to products link", async () => {
        await renderPage();
        expect(screen.getByRole("link", { name: "← Products" })).toHaveAttribute(
          "href",
          "/products"
        );
      });

      it("should render the home link", async () => {
        await renderPage();
        expect(screen.getByRole("link", { name: "← Home" })).toHaveAttribute("href", "/");
      });

      it("should call ProductService.getProductById with the correct id", async () => {
        await renderPage("product-id-1");
        expect(ProductService.getProductById).toHaveBeenCalledWith("product-id-1");
      });
    });

    describe("when the product does not exist", () => {
      beforeEach(() => {
        jest.mocked(ProductService.getProductById).mockResolvedValue(null);
      });

      it("should call notFound", async () => {
        await expect(ProductPage(buildProps())).rejects.toThrow("NEXT_NOT_FOUND");
      });
    });

    describe("when the service throws an error", () => {
      beforeEach(() => {
        jest
          .mocked(ProductService.getProductById)
          .mockRejectedValue(new Error("Service unavailable"));
      });

      it("should render the error heading", async () => {
        await renderPage();
        expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
      });

      it("should render the error description", async () => {
        await renderPage();
        expect(screen.getByText("Service unavailable")).toBeInTheDocument();
      });
    });
  });

  describe("when the user is not logged in", () => {
    beforeEach(() => {
      jest.mocked(getSession).mockResolvedValue(null);
    });

    it("should redirect to the login page", async () => {
      await expect(ProductPage(buildProps())).rejects.toThrow("NEXT_REDIRECT:/login");
    });
  });
});

describe("generateMetadata", () => {
  describe("when the product exists", () => {
    it("should return the product name as title", async () => {
      jest.mocked(ProductService.getProductById).mockResolvedValue(mockProduct);
      const result: Metadata = await generateMetadata(buildProps());
      expect(result.title).toBe(mockProduct.name);
    });
  });

  describe("when the product does not exist", () => {
    it("should return Product not found as title", async () => {
      jest.mocked(ProductService.getProductById).mockResolvedValue(null);
      const result: Metadata = await generateMetadata(buildProps());
      expect(result.title).toBe("Product not found");
    });
  });

  describe("when the service throws", () => {
    it("should return Product not found as title", async () => {
      jest.mocked(ProductService.getProductById).mockRejectedValue(new Error("error"));
      const result: Metadata = await generateMetadata(buildProps());
      expect(result.title).toBe("Product not found");
    });
  });
});
