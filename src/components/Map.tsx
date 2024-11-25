"use client"
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const center = {
  lat: 1.9851,
  lng: 30.0319,
}

export default function Mapleaflet() {
  return (
    <MapContainer
      key={`${center.lat}-${center.lng}`}  // Unique key based on center
      center={center}
      className='min-h-72'
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}