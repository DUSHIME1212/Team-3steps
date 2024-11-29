"use client"
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
import { useRouter } from "next/navigation";
import { User } from "@/types/types";

const DashboardNavbar = () => {
  const router = useRouter()
  const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');

  const links = [
    { label: "Home", url: "/#home" },
    { label: "About us", url: "/#about" },
    { label: "Listings", url: "/#listings" },
    { label: "Testimonies", url: "/#test" },
    { label: "property", url: "/property" },
  ];
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row w-full items-center justify-between">
        <div >
          <Sheet>
            <SheetTrigger className="flex gap-4 items-center">
              <Image src="/image.png" width={100} height={100} className="size-8 rounded-3xl object-cover" alt="" />Profile

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
                      <span className="text-lg font-bold">First Name</span>
                      <p>{storedUser.firstName}</p>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg font-bold">Last Name</span>
                      <p>{storedUser.lastName}</p>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg font-bold">Phone Number</span>
                      <p>{storedUser.phoneNumber}</p>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg font-bold">Email</span>

                      <p>{storedUser.email}</p>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg font-bold">Birth Date</span>

                      <p>{storedUser.birthDate}</p>
                    </h1>
                    <h1 className="flex flex-col hover:outline-1 duration-500 rounded-2xl p-2 gap-2">
                      <span className="text-lg font-bold">Bio</span>

                      <p>{storedUser.bio}</p>
                    </h1>
                  </div>
                </SheetDescription>
                <Button onClick={() => {
                  sessionStorage.removeItem("3step-token");
                  router.push("/")
                }} className="rounded-xl" variant={"gooeyLeft"}>
                  Log out
                </Button>
              </SheetHeader>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
