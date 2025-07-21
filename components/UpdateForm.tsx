"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChangeEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { updateAction } from "@/app/utils/updateAction";

// Product Interface
interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const UpdateForm = ({ productId }: { productId: string }) => {
  // router to get back to home page
  const router = useRouter();
  // imageURL state to store the uploaded image URL
  const [imageURL, setImageURL] = useState("");

  // Get product data for update
  const [product, setProduct] = useState<Product>();

  // Use useEffect to save products to the useState
  useEffect(() => {
    // Use axios to fetch
    axios
      .get(`/api/product/${productId}`)
      .then((response) => setProduct(response.data.product));
  }, []);

  // useEffect to check if product exists
  useEffect(() => {
    if (product) {
      setImageURL(product.image);
    }
  }, [product]);

  //  Server Action
  async function clientAddAction(formData: FormData) {
    const { error, success } = await updateAction(formData, productId);

    if (error) {
      // Toast notification npm install react-hot-toast
      toast.error(error);
    }
    if (success) {
      toast.success(success);

      router.push("/");

      // Reset imageURL state back to empty string
      setImageURL("");
    }
  }

  // Create function to display preview image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("File size exceeds 1MB");
        return;
      } else {
        setImageURL(URL.createObjectURL(file));
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Display the preview image
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.alt = "Preview";
        img.className = "mt-2 w-full h-auto rounded-lg";
        document.getElementById("image-preview")?.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      {/* IMAGE PREVIEW */}
      {imageURL && (
        <Image
          src={imageURL}
          alt="Preview"
          width={1000}
          height={1000}
          className="mt-2 max-w-full max-h-72 object-cover object-center rounded-lg"
        />
      )}
      <div className="flex flex-col w-full">
        <label>Product Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={product?.name}
          placeholder="Enter product name"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={product?.price}
          placeholder="Enter product price"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Seller's Link:</label>
        <input
          type="text"
          name="link"
          defaultValue={product?.link}
          placeholder="Seller's Link for buyers"
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          defaultValue={product?.description}
          rows={4}
          className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg bg-white border border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#292125] text-white py-2 px-3 rounded-lg hover:bg-[#3a3530] transition-colors duration-200 cursor-pointer"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateForm;
