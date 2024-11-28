"use client"
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

function MyComponent({coord}:{coord:any}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
  })

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coord || center}
      zoom={13}
      onLoad={onLoad}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
