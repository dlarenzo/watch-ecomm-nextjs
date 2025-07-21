import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-h-[60vh] lg-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black">
      <div className="max-w-2xl">
        <h1 className="pt-6 md:pt-0 text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Discover Timeless Watches
        </h1>
        <p className="text-lg md:text-xl mt-4 mb-6 text-[#495057]">
          Explore our exclusive collection of luxury watches that blend style
          and precision.
        </p>
        <Link href="#products">
          <button className="mt-8 bg-[#292125] text-white py-2 px-4 rounded cursor-pointer">
            Shop the Collection
          </button>
        </Link>
      </div>
      {/* IMAGE */}
      <div>
        <Image
          src="/imgs/hero-watch-no-bg.png"
          alt="Luxury Watch"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
