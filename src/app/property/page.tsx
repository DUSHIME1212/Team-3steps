import Image from "next/image";
import React from "react";
import Listings from "./_components/Listings";
import Footer from "@/components/Footer";
import Navbar from "./_components/Navbar";

const page = () => {
  const cover =
    "https://plus.unsplash.com/premium_photo-1675122317427-7d9dd55faf93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <Navbar/>
      <div className="min-h-[512px] flex items-center justify-center relative">
        <div className="size-full bg-gradient-to-t from-black/70 to-transparent  absolute z-10" />
        <Image src={cover} alt="" className="object-cover" fill />
        <div className="mt-32 text-white size-full z-20 px-8 md:px-16">
          <h1 className="text-5xl font-dmsans font-bold text-white">
            Welcome to our property page
          </h1>
          <p className="text-xl w-2/3 my-4">
            Explore our curated selection of rental properties in Kigali,
            offering comfort, convenience, and style. Whether you&apos;re
            looking for a cozy apartment in the heart of the city or a spacious
            villa with scenic views, we have options to fit every lifestyle and
            budget.
          </p>
        </div>
      </div>
      <div className="px-8 lg:px-16">
        <Listings />
      </div>
      <Footer/>
    </>
  );
};

export default page;
