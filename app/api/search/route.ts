import { NextRequest } from "next/server";
import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Search Parameters
    const searchParams = request.nextUrl.searchParams;
    // Search Term
    const searchTerm = searchParams.get("searchTerm");
    // Get product based on search term
    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    }).sort({ createdAt: -1 });

    // Return the products as a JSON response
    return Response.json({ products }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
