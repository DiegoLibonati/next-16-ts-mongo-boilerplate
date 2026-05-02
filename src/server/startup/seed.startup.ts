import bcryptjs from "bcryptjs";

import { UserModel } from "@/server/models/user.model";
import { ProductModel } from "@/server/models/product.model";

export async function seedIfEmpty(): Promise<void> {
  const [userCount, productCount] = await Promise.all([
    UserModel.countDocuments(),
    ProductModel.countDocuments(),
  ]);

  if (userCount === 0) {
    const hash = await bcryptjs.hash("demo1234", 10);
    await UserModel.insertMany([
      { name: "Alice Demo", email: "alice@example.com", password: hash },
      { name: "Bob Demo", email: "bob@example.com", password: hash },
      { name: "Carol Demo", email: "carol@example.com", password: hash },
    ]);
    console.log("Seeded 3 demo users (password: demo1234)");
  }

  if (productCount === 0) {
    await ProductModel.insertMany([
      {
        name: "Widget Pro",
        description: "A professional-grade widget for power users.",
        price: 29.99,
      },
      {
        name: "Gadget Plus",
        description: "Enhanced gadget with extra features and durability.",
        price: 49.99,
      },
      {
        name: "Doohickey Standard",
        description: "The reliable standard doohickey for everyday tasks.",
        price: 9.99,
      },
    ]);
    console.log("Seeded 3 demo products");
  }
}
