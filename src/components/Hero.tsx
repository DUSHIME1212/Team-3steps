"use client";

import React from "react";
import Carouselplay from "./Coursel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Filter, Search } from "@geist-ui/icons";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter()
  return (
    <div className="min-h-svh flex flex-col items-center px-8 md:px-16 lg:px-32 justify-center relative">
      <div className="hidden size-full md:flex lg:flex max-h-screen max-w-screen-md absolute -z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-darkBlue/20 to-40% to-transparent rounded-full" />
      <div className="size-full mt-32 flex flex-col md:flex-row lg:flex-row justify-center">
        <div className="w-100 md:w-1/2 lg:w-1/2 p-0 md:p-16 lg:p-16 mt-8 md:mt-0 lg:mt-0">
          <div className="mb-4 flex flex-col gap-4">
            <span className="font-semibold text-blue-500">REAL ESTATE</span>
            <h1 className="text-2xl md:text-5xl lg:text-5xl font-semibold">
              Find a perfect home you love..!
            </h1>
            <p className="text-sm">
              Etiam eget elementum elit. Aenean dignissim dapibus vestibulum.
              Integer a dolor eu sapien sodales vulputate ac in purus.
            </p>
          </div>
          <Carouselplay />
        </div>
        <div className="w-100 md:w-1/2 lg:w-1/2 h-full size-full p-0 md:p-16 lg:p-16 mt-6 md:mt-0 lg:mt-0 flex self-center">
          <Tabs defaultValue="Sale" className="w-full shadow-xl p-0 md:p-4 lg:p-8 backdrop-blur-lg rounded-3xl size-fit">
            <TabsList className="w-full h-fit rounded-full">
              <TabsTrigger
                className="w-1/2 rounded-full text-lg p-4"
                value="Sale"
              >
                For Sale
              </TabsTrigger>
              <TabsTrigger
                className="w-1/2 rounded-full text-lg p-4"
                value="Rent"
              >
                For Rent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Sale" className="flex flex-col p-4 rounded-3xl gap-8">
              <Input placeholder="Kigali, Rwanda" type="text" className="py-6" name="location" />
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <Button variant={"outline"} onClick={() => router.push("/property")} className="py-6">
                <Filter /> Advance Search
              </Button>
              <Button size={"lg"} className="  py-6">
                <Search />
                Search
              </Button>
            </TabsContent>
            <TabsContent value="Rent" className="flex flex-col p-4 rounded-3xl gap-8">
              <Input placeholder="Kigali, Rwanda" type="text" className="py-6" name="location" />
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <Button variant={"outline"} className="py-6">
                <Filter /> Advance Search
              </Button>
              <Button size={"lg"} className=" py-6">
                <Search />
                Search
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Hero;
