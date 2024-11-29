"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Home, User, Menu, X } from "@geist-ui/icons";
import Addlistings from "./Addlistings";
import Image from "next/image";
import { Button } from "antd";
// import { Tabs } from "@geist-ui/core";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // This code runs only in the browser
  useEffect(() => {
    setToken(sessionStorage.getItem('3step-token'));
  }, [token])

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
      <div className="w-full flex justify-between items-center text-white bg-blue-600 opacity-60 px-2 py-2 md:px-16 lg:px-32">
        <p className="uppercase text-sm">Kigali, RWANDA kk509st</p>
        <div className="flex flex-col md:flex-row lg:flex-row gap-0 md:gap-4 lg:gap-4 text-sm">
          <span>+250782454192</span>
          <span>support@alustudent.com</span>
        </div>
      </div>
      <div className="flex justify-between px-8 items-center md:hidden lg:hidden">
        <div className="flex items-center">
          <div className="size-4 relative">
            <Image src={'/images/logo2.png'} alt="" className="object-contain" fill />
          </div>
          <p className="text-sm font-semibold">Hello Rwanda</p>
        </div>
        {/* Hamburger Menu Icon */}
        <div className="flex items-center md:hidden space-x-2">
          {token !== null ? (
            <div className="flex space-x-2 px-4">
              <User />
              <Link onClick={() => {
                sessionStorage.removeItem("3step-token")
                setToken(null)
              }} href={"/"}>Logout</Link>
            </div>
          ) : (
            <Button className="border-indigo-600 text-indigo-600">
              <Link href={"/login"} className="text-indigo-600">Login</Link>
            </Button>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-8 flex items-center md:px-16 lg:px-16 justify-between">
        <div className="flex flex-col items-center">
          <div className="items-center hidden md:flex lg:flex">
            <div className="size-10 relative">
              <Image src={'/images/logo2.png'} alt="" className="object-contain" fill />

            </div>
            <p className="p-3 font-semibold">Hello Rwanda</p>
          </div>
          {/* Action Buttons for Mobile */}
          {isMobileMenuOpen && (
            <div className="flex max-w-max flex-col items-center gap-2 md:hidden">
              <div className="flex flex-col gap-4 font-dmsans py-2 bg-white rounded-2xl">
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
              <Link key={index} href={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        )}


        {/* Action Buttons */}
        <div className="hidden md:flex items-center">
          {token !== null ? (
            <div className="flex space-x-2 px-4">
              <User />
              <Link onClick={() => {
                sessionStorage.removeItem("3step-token");
                setToken(null);
              }} href={"/"}>Logout</Link>
            </div>
          ) : (
            <Button className="border-indigo-600 text-indigo-600 mx-2">
              <Link href={"/login"} className="text-indigo-600">Login</Link>
            </Button>
          )}

          <div className="flex items-center w-fit min-w-[156px] justify-center px-2 bg-indigo-600 rounded-xl text-white gap-2">
            <Home />
            <Addlistings />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
