import React, { useContext, useState } from "react";

import { IBackLocationContext, locationName } from "../../utils/types";
import { BASE_CLIENT_URL } from "../../routes";

const BackLocationContext = React.createContext({
  backLocation: "Movie List",
  setBackLocation: (destination) => {},
  backPath: "",
} as IBackLocationContext);

export function useBackLocation() {
  return useContext(BackLocationContext);
}

export default function BackLocationProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [backLocation, setBackLocation] = useState(
    "Movie List" as locationName
  );

  function backPathFromLocationName(backLocationName: locationName) {
    if (backLocationName === "Wishlist") {
      return `${BASE_CLIENT_URL}/wishlist`;
    } else if (backLocationName === "Movie List") {
      return `/${BASE_CLIENT_URL}`;
    } else {
      return "";
    }
  }

  return (
    <BackLocationContext.Provider
      value={{
        backLocation,
        setBackLocation,
        backPath: backPathFromLocationName(backLocation),
      }}
    >
      {children}
    </BackLocationContext.Provider>
  );
}
