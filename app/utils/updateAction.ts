"use server";
import { connect } from "http2";
import React from "react";
import { connectDB } from "../api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "../api/models/product.model";

export async function updateAction(formData: FormData, id: string) {
  try {
    // Extract form data
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const link = formData.get("link") as string;
    const description = formData.get("description") as string;

    // Check to make sure user doesn't submit empty fields
    if (!name || !price || !link || !description) {
      console.log("All fields are required");
      return {
        error: "All fields are required.",
      };
    }
    // Connect DB
    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return {
        error: "Product not found.",
      };
    }

    if (image.size === 0) {
      // update without the image
      await Product.findByIdAndUpdate(id, {
        name,
        price,
        link,
        description,
      });
      return {
        success: "Product updated successfully!",
      };
    } else {
      // delete old image first before adding new image
      const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      cloudinary.uploader
        .destroy(`timeless/${imageId}`)
        .then((results) => console.log("Results", results));

      // Handle image upload and store in Cloudinary
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "timeless",
            },
            async (error, result) => {
              if (error) {
                return reject(error.message);
              }
              return resolve(result);
            }
          )
          .end(buffer);
      });
      console.log("Image response: ", imageResponse);

      // Store product (EVERYTHING) information in the database
      await Product.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        name,
        price,
        link,
        description,
      });

      // SUCCESS NOTIFICATION WITH TOAST
      return {
        success: "Product added successfully!",
      };
    }
  } catch (error) {
    return {
      error: "An error occurred while adding the product.",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
