import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { ProductService } from "@/server/services/product.service";

import { getExceptionMessage } from "@/server/helpers/get_exception_message.helper";

export const ProductController = {
  async getAll(_req: NextRequest): Promise<NextResponse> {
    try {
      const products = await ProductService.getAllProducts();
      return NextResponse.json({ data: products }, { status: 200 });
    } catch (error) {
      console.error("productController.getAll", error);
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status: status });
    }
  },

  async getById(_req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const product = await ProductService.getProductById(id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ data: product }, { status: 200 });
    } catch (error) {
      console.error("productController.getById", error);
      const { status, ...response } = getExceptionMessage(error);
      return NextResponse.json(response, { status: status });
    }
  },
};
