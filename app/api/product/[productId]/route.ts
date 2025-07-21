import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";
import cloudinary from "../../../utils/cloudinary";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();

  // Extract productId from params(route)
  const productId = (await params).productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json({ message: " Product not found." }, { status: 404 });
    }
    // Return the product data if found
    return Response.json({ product }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

// DELETE method to delete a product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();
  const productId = (await params).productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return Response.json(
        { message: "Unable to find product" },
        { status: 404 }
      );
    }

    // Delete image in cloudinary first
    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    cloudinary.uploader
      .destroy(`timeless/${imageId}`)
      .then((results) => console.log("Results", results));

    // Delete product from database
    await Product.findByIdAndDelete(productId);
    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
