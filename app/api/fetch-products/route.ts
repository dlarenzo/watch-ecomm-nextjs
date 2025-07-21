import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET(request: Request) {
  // Connect to the database
  const db = await connectDB();
  // Fetch products from the database
  try {
    // fetch products
    const products = await Product.find({}).sort({ createdAt: -1 });

    // Return the products as a JSON response
    return Response.json({ products }, { status: 200 });
  } catch (error: any) {
    console.log("Error fetching products:");
    return Response.json({ message: error.message }, { status: 400 });
  }
}
