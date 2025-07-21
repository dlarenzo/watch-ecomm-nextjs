"use client";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  // Search bar leads to search page handleChange
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);

    // Convert to a string
    const searchQuery = urlParams.toString();
    // Redirect to the search page with the query
    router.push(`/search?${searchQuery}`);
  };

  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="hidden md:inline-block text-lg font-semibold">
          Timeless
        </Link>
        <div className="relative max-w-[=300px] md:w-[400px]">
          {/* SEARCH FIELD */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search..."
            className="h-[36px] pl-10 pr-4 py-2 border border-gray-300 text-sm rounded-md w-full focus:outline-none bg-transparent"
          />
        </div>

        <Link href="/add-product">
          <button className="bg-[#212529] text-white py-2 px-4 rounded-md cursor-pointer">
            Add Product
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
