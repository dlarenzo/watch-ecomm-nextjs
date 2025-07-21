"use client";
import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";
import React from "react";

const UpdateProductPage = () => {
  const params = useParams();
  return (
    <div className="p-4 md:px-12 bg-[#f8f9fa] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full max-w-xl mx-auto">
        Update product
      </h2>

      {/* UPDATE FORM COMPONENT BELOW */}
      <UpdateForm productId={params.productId as string} />
    </div>
  );
};

export default UpdateProductPage;
