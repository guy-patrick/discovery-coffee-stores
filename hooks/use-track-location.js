import { useState } from "react";

function useTrackLocation() {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setlatLong] = useState("");

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setlatLong(`${latitude},${longitude}`);
  };

  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return { handleTrackLocation, latLong, locationErrorMsg };
}

export default useTrackLocation;
