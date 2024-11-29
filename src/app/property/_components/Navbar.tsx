import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const Navbar = () => {
  const links = [
    { label: "Home", url: "/#home" },
    { label: "About us", url: "/#about" },
    { label: "Listings", url: "/#listings" },
    { label: "Testimonies", url: "/#test" },
    { label: "property", url: "/property" },
  ];
  return (
    <div className="p-8 md:px-16 flex flex-row justify-between">
      <div className="flex flex-row w-full items-center justify-between">
        <Button variant={"linkHover1"} className="rounded-none" asChild>
          <Link href="/">{links[0].label}</Link>
        </Button>

        <div >
          <Sheet>
            <SheetTrigger className="flex gap-4 items-center">
                <Image src="/image.png" className="size-8 rounded-3xl object-cover" alt="" />Profile
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
                <SheetDescription className="text-sm flex flex-col gap-4">
                  <div className="size-32 min-h-56 w-full relative overflow-clip rounded-3xl">
                    <Image
                      src={"/image.png"}
                      alt=""
                      className="object-cover"
                      fill
                    />
                  </div>
                  <div>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg">Firstname</span>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg">LastName</span>
                    </h1>
                  </div>
                  <div>
                    <div className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2"><span className="text-lg">phoneNumber</span></div>
                    <div className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2"> <span className="text-lg">email</span></div>
                    <div className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2"><span className="text-lg">birthDate</span></div>
                    <div className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2"><span className="text-lg">bio</span></div>
                  </div>
                </SheetDescription>
                <Button className="rounded-xl" variant={"gooeyLeft"}>Log out</Button>
              </SheetHeader>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
