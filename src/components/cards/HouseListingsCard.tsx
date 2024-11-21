import Image from "next/image";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { house } from "@/data/house";
import Link from "next/link";
const HouseListingsCard = () => {
  return (
    <>
      {house.map((houses) => (
        <div key={houses.id} className="min-w-[356px] min-h-72 p-2 overflow-clip">
          <Link href={`/property/${houses.id}`}>
          <div className="min-h-56 relative rounded-xl overflow-clip">
            <Image src={houses.imageUrl} alt="" fill className="object-cover" />
          </div>
          </Link>
          <div className="p-4 flex flex-col gap-2">
            <span className="font-semibold text-md text-blue-500 my-2">
              {houses.title}
            </span>
            <h1 className="text-xl text-black font-semibold">{houses.subtitle}</h1>
            <p className="text-gray-500 uppercase text-lg">{houses?.price}</p>
          </div>
          <div className="w-full flex justify-between">
            <div className="grid hover:bg-black/10 duration-500 rounded-xl outline-2 outline-destructive p-4">
              <FaWhatsapp />
            </div>
            <div className="grid hover:bg-black/10 duration-500 rounded-xl outline-2 outline-destructive p-4">
              <MdOutlineLocalPhone />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HouseListingsCard;
