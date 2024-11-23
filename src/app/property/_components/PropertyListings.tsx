import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  id: number
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
}

export function PropertyCard({ id, title, price, bedrooms, bathrooms, area, image }: PropertyCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image src={image} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{bedrooms} beds • {bathrooms} baths • {area} sqft</p>
        <p className="text-xl font-bold mb-4">{new Intl.NumberFormat('rw-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(price)}</p>
        <Button className="w-full">View Details</Button>
      </div>
    </div>
  )
}