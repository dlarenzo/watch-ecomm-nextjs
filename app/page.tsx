import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#f8f9fa]">
      <Hero />

      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6">
        All Products
      </h2>
      <ProductList />
    </div>
  );
}
