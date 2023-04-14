import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leafletStyles.css";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);

const DTyleLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);

const IllinoisMapPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="w-full min-h-screen flex justify-center items-center border-2 border-black">
      <DynamicMapContainer center={[40.6331, 89.3985]} zoom={13}>
        <DTyleLayer
          className="w-72 h-72"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </DynamicMapContainer>
    </div>
  ) : null;
};

export default IllinoisMapPage;
