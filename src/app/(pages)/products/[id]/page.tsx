import { notFound, redirect } from "next/navigation";

import type { JSX } from "react";
import type { Metadata } from "next";
import type { ProductPageProps } from "@/types/props";

import { getSession } from "@/server/helpers/get_session.helper";
import { ProductService } from "@/server/services/product.service";

import Link from "@/components/Link/Link";

import "@/app/(pages)/products/[id]/product.css";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await ProductService.getProductById(id);
    return { title: product?.name ?? "Product not found" };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({ params }: ProductPageProps): Promise<JSX.Element> {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;

  let product = null;
  let fetchError: string | null = null;

  try {
    product = await ProductService.getProductById(id);
  } catch (err) {
    fetchError = err instanceof Error ? err.message : "Failed to load product";
  }

  if (!fetchError && !product) notFound();

  return (
    <main className="product-page">
      {fetchError ? (
        <>
          <h1 className="title">Error</h1>
          <p className="description">{fetchError}</p>
        </>
      ) : (
        <>
          <h1 className="title">{product?.name}</h1>
          <p className="description">{product?.description}</p>
          <p className="price">${product?.price.toFixed(2)}</p>
        </>
      )}
      <nav className="links">
        <Link href="/products">← Products</Link>
        <Link href="/">← Home</Link>
      </nav>
    </main>
  );
}
