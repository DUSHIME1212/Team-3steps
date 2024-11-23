"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import React, { useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { X } from "lucide-react";

const Listings = () => {
  const [value, setValue] = useState([0, 2000000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      price: 500000,
      bedrooms: 2,
      bathrooms: 1,
      area: 1000,
      image: "/image.png",
      type: "Apartment"
    },
    {
      id: 3,
      title: "Modern villa",
      price: 1500000,
      bedrooms: 12,
      bathrooms: 4,
      area: 1000,
      image: "/image.png",
      type: "villa"
    }
    
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBedrooms = !bedrooms || property.bedrooms >= parseInt(bedrooms);
    const matchesType = !propertyType || property.type === propertyType;
    const matchesPrice = property.price >= value[0] && property.price <= value[1];

    return matchesSearch && matchesBedrooms && matchesType && matchesPrice;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("rw-RW", {
      style: "currency",
      currency: "RWF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="grid min-h-screen grid-cols-5">
      <aside className="col-span-1 p-4 mt-16">
        <form className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Label
              className="block text-sm font-medium text-gray-700"
              htmlFor="search"
            >
              Filters
            </Label>
            <Button
            size={"sm"}
              onClick={(e) => {
                e.preventDefault();
                setValue([0, 2000000]);
                setSearchTerm("");
                setBedrooms("");
                setPropertyType("");
              }}
            >
              <X className="size-4"/>
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="p-2 py-4">
            <div className="flex justify-between items-center ">
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="budget-range"
              >
                Budget
              </Label>
            </div>
            <div className="space-y-4 p-2">
              <div className="flex items-start p-2 flex-col justify-between gap-2">
                <Label className="leading-6" htmlFor="budget-range">
                  Budget in Rwandan Francs
                </Label>
                <output className="text-sm font-medium tabular-nums">
                  {formatPrice(value[0])} - {formatPrice(value[1])}
                </output>
              </div>
              <Slider
                id="budget-range"
                min={0}
                max={2000000}
                step={50000}
                value={value}
                onValueChange={setValue}
                className="w-full"
                aria-label="Budget range slider"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="property-type">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="property-type">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </aside>
      <main className="col-span-4 p-4  mt-16">
        <h2 className="text-2xl font-bold mb-6">Available Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No properties found matching your criteria.
          </p>
        )}
      </main>
    </section>
  );
};

export default Listings;
