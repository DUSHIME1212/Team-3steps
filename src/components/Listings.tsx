import React from "react";
import { Button } from "./ui/button";
import HouseListingsCard from "./cards/HouseListingsCard";

const Listings = () => {
  return (
    <div id="listings" className="w-full p-8 md:px-16 lg:px-32">
      {/* top */}
      <div className="w-full flex flex-col md:flex-row lg:flex-row">
        <div className=" mb-4 flex w-100 md:w-1/2 lg:w-1/2 flex-col gap-4">
          <span className="font-semibold text-blue-500">CHECKOUT OUR NEW</span>
          <h1 className="text-2xl md:text-5xl lg:text-5xl font-semibold">Latest Listed Properties</h1>
          <p className="text-sm">
            Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec
            dignissim purus.
          </p>
        </div>
        <div className="w-100 md:w-1/2 lg:w-1/2 flex justify-start md:justify-end lg:justify-end items-center gap-4">
          <Button size={"lg"} className="rounded-full" variant={"outline"}>
            All
          </Button>
          <Button size={"lg"} className="rounded-full">
            Sell
          </Button>
          <Button size={"lg"} className="rounded-full" variant={"outline"}>
            Rent
          </Button>
        </div>
      </div>
      <div className="w-full min-h-56 overflow-x-scroll gap-4 flex mt-8">
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <HouseListingsCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Listings;
