import { redirect } from "next/navigation";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { IProduct } from "@/types/models";

import { getSession } from "@/server/helpers/get_session.helper";
import { ProductService } from "@/server/services/product.service";

import Link from "@/components/Link/Link";

import "@/app/(pages)/products/products.css";

export const metadata: Metadata = { title: "Products" };

async function ProductsPage(): Promise<JSX.Element> {
  const session = await getSession();
  if (!session) redirect("/login");

  let products: IProduct[] = [];
  let fetchError: string | null = null;

  try {
    products = await ProductService.getAllProducts();
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Failed to load products";
  }

  return (
    <main className="products-page">
      <h1 className="title">Products</h1>
      {fetchError ? (
        <p className="error-message">{fetchError}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="products-list">
          {products.map((product) => (
            <li key={product._id}>
              <Link href={`/products/${product._id}`} className="product-card">
                <span className="product-name">{product.name}</span>
                <span className="product-price">${product.price.toFixed(2)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <nav className="links">
        <Link href="/">← Home</Link>
      </nav>
    </main>
  );
}

export default ProductsPage;
