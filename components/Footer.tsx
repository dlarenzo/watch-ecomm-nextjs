import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="text-[#495057] text-sm text-center px-4 md:px-12 py-4 md:py-6">
        © 2023 Timeless Watches. All rights reserved.{" "}
        <Link href="https://larenzodegraff.com/">Site: larenzodegraff.com</Link>
      </p>
    </footer>
  );
};

export default Footer;
