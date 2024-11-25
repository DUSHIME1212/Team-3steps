"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { Home, User, Menu, X } from "@geist-ui/icons";
import { DialogDemo } from "./Model";
import Addlistings from "./Addlistings";
import Image from "next/image";
import { Button } from "./ui/button";
// import { Tabs } from "@geist-ui/core";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { label: "Home", url: "/#home" },
    { label: "About us", url: "/#about" },
    { label: "Listings", url: "/#listings" },
    { label: "Testimonies", url: "/#test" },
    { label: "property", url: "/property" },
  ];

  return (
    <nav className="flex flex-col w-full z-30 h-48 fixed bg-gradient-to-b from-white from-40% to-transparent ">
      {/* Top */}
      <div className="w-full flex justify-between items-center text-white bg-darkBlue px-2 py-2 md:px-16 lg:px-32">
        <p className="uppercase text-sm">Kigali, RWANDA kk509st</p>
        <div className="flex flex-col md:flex-row lg:flex-row gap-0 md:gap-4 lg:gap-4 text-sm">
          <span>+250782454192</span>
          <span>support@alustudent.com</span>
        </div>
      </div>
      <div className="flex justify-between px-8 items-center md:hidden lg:hidden">
        <div className="h-16 w-16 relative">
          <Image src={'/logo3.png'} alt="" className="object-contain" fill />
        </div>
        {/* Hamburger Menu Icon */}
        <div className="flex items-center md:hidden">
          <User />
          <DialogDemo />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-8 flex items-center md:px-16 lg:px-16 justify-between">
        <div className="flex flex-col items-center">

          <div className="h-24 w-24 relative hidden md:flex lg:flex">
            <Image src={'/logo3.png'} alt="" className="object-contain" fill />
          </div>
          {/* Action Buttons for Mobile */}
          {isMobileMenuOpen && (
            <div className="flex flex-col items-center gap-2 md:hidden">
              <div className="w-full flex flex-col gap-4 font-dmsans py-2 bg-white rounded-2xl">
                {links.map((link, index) => (
                  <Link key={index} href={link.url} className="text-justify text-sm">{link.label}</Link>
                ))}
                <div className="flex items-center space-x-2 w-fit min-w-[156px] justify-center p-4 bg-blue-500 rounded-xl text-white">
                  <Home />
                  <Addlistings />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Links - Mobile & Desktop */}
        {!isMobileMenuOpen && (
          <div
            className={`flex-col md:flex-row wrapper font-dmsans capitalize  flex md:flex gap-x-8 text-md font-normal items-center ${isMobileMenuOpen ? "flex" : "hidden md:flex"
              }`}
          >
            {links.map((link, index) => (
              <Link key={index}  href={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        )}


        {/* Action Buttons */}
        <div className="hidden md:flex">
          <Button variant={"link"} className="w-full flex gap-2 items-center" asChild>
            <Link href="/login">
              <User /> Log in
            </Link>
          </Button>
          <div className="flex items-center w-fit min-w-[156px] justify-center px-2 bg-darkBlue rounded-xl text-white gap-2">
            <Home />
            <Addlistings />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
