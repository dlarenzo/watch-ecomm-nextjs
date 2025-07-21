"use client";
import ProductList from "@/components/ProductList";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Get single product or single data component using the id

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  link: string;
  description: string;
}

const ProductPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const params = useParams();
  // Fetch product data using the productId from the URL which is state of <Product>
  const [product, setProduct] = useState<Product>();

  // Function to handle product deletion
  const handleDelete = async () => {
    const response = await axios.delete(`/api/product/${params.productId}`);

    // Show success message using toast
    toast.success(response.data.message);

    // Redirect to home page after deletion
    router.push("/");
  };

  // Fetch products from route handlers using useEffect and axios
  useEffect(() => {
    axios
      .get(`/api/product/${params.productId}`)
      .then((response) => setProduct(response.data.product));
  }, []);

  if (!product) {
    return <div>Product Loading...</div>;
  }
  return (
    <div className="px-4 md:px-12 bg-[#f8f9fa]">
      {/* back button */}
      <p className="cursor-pointer py-3" onClick={() => router.back()}>
        &larr; Back
      </p>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-10">
        <Image
          src={product.image}
          alt={product.name}
          width={1000}
          height={1000}
          className="max-w-full md:max-w-xl md:min-w-[30rem] min-h-[28rem] max-h-[28rem] object-cover object-center basis-1/2"
        />

        <div className="basis-1/2 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{product.name}</h2>

            <div className="text-2xl font-bold mt-2 relative">
              <span
                onClick={() => setOpen(!open)}
                className="cursor-pointer tracking-widest"
              >
                ...
              </span>

              {open && (
                <div className="absolute bg-white shadow-md pb-2 px-5 text-base font-normal right-0 top-10">
                  <Link href={`/product/${product._id}/update`}>
                    <p className="mb-2 pb-2 border-b border-gray-300">Update</p>
                  </Link>
                  <p
                    onClick={handleDelete}
                    className="text-red-500 cursor-pointer"
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Price */}
          <h3 className="text-3xl font-semibold mt-3">${product.price}</h3>

          {/* Contact Seller Button */}
          <Link
            href={product.link}
            target="_blank"
            className="text-blue-500 underline"
          >
            <button className="mt-8 bg-[#212529] hover:bg-[#343a40] text-white px-3 py-2 w-full font-semibold">
              Contact Seller
            </button>
          </Link>

          {/* Product Description */}
          <p className="font-semibold mt-10 text-lg">Description</p>
          <p className="mt-1">{product.description}</p>
        </div>
      </div>

      <h2 className="w-full text-2xl font-semibold pt-20">Related Products</h2>
      <ProductList />
    </div>

    //
  );
};

export default ProductPage;
