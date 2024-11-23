
"use client"
import { useParams } from "next/navigation";
import { house } from "@/data/house";
import Image from "next/image";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const SinglePropertyPage = () => {
  const params = useParams();
  const { id } = params;

  const property = house.find((house) => house.id === Number(id));

  if (!property) {
    return <div>Property not found</div>; 
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6 mt-44 mb-16 items-center">
        {/* Property Image */}
        <div className="w-full lg:w-1/2 relative h-80 rounded-xl overflow-hidden">
          <Image src={property.imageUrl} alt={property.title} layout="fill" objectFit="cover" />
        </div>

        {/* Property Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <h2 className="text-xl text-gray-700">{property.subtitle}</h2>
          <p className="text-xl text-green-500 font-semibold">{property.price}</p>
          
          <div className="flex gap-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
              Contact Agent
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center gap-2">
              <FaWhatsapp className="text-green-500" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
