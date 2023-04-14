import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

function IllinoisMap({ counties }) {
  return (
      <MapContainer
        center={[40.6331 , 89.3985]}
        zoom={7}
        className="border border-red-500 rounded-lg hover:bg-red-500"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {/* <GeoJSON data={counties} /> */}
      </MapContainer>
  );
}

export default IllinoisMap;
