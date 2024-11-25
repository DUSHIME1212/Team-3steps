'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { FaBed, FaBath, FaRuler, FaWhatsapp } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Mapleaflet from '@/components/Map'
const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    price: 500000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1000,
    image: "/image.png",
    type: "Apartment",
    description: "A beautiful modern apartment in the heart of the city. Perfect for young professionals or small families.",
    location: [51.505, -0.09] as [number, number]
  },
  {
    id: 3,
    title: "Modern Villa",
    price: 1500000,
    bedrooms: 12,
    bathrooms: 4,
    area: 1000,
    image: "/image.png",
    type: "Villa",
    description: "Luxurious villa with stunning views and top-of-the-line amenities. Ideal for those seeking the ultimate in comfort and style.",
    location: [51.51, -0.1] as [number, number]
  }
]



export default function PropertyPage() {
  const params = useParams()
  const { id } = params
  
  const property = properties.find((p) => p.id === Number(id))

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-xl text-gray-600">The property youre looking for doesnt exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-44 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <Image src={property.image} alt={property.title} layout="fill" objectFit="cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">${property.price.toLocaleString()}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaBed className="mr-2" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center text-gray-600">
              <FaBath className="mr-2" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center text-gray-600">
              <FaRuler className="mr-2" /> {property.area} sqft
            </div>
          </div>
          <p className="text-gray-700 mb-8">{property.description}</p>
          <Mapleaflet/>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Agent</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md" />
              <Input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md" />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border rounded-md"></textarea>
              <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </Button>
            </form>
            <button className="w-full mt-4 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <FaWhatsapp className="text-green-500" />
              Contact via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

