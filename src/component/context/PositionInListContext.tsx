import React, { useContext, useRef } from "react";

import {
  initialBlankUserPosition,
  TUserPosition,
  IUserPositionContext,
} from "../../utils/types";

const UserPositionInListContext = React.createContext({
  userPosition: { positionX: 0, positionY: 0 },
  saveUserPosition: initialBlankUserPosition,
  restoreUserPosition: initialBlankUserPosition,
} as IUserPositionContext);

export function useUserPositionInList() {
  return useContext(UserPositionInListContext);
}

export default function UserPositionInListProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const userPositionAndSetter = useRef({
    positionX: 0,
    positionY: 0,
  } as TUserPosition);

  function setUserPosition(newUserPosition: TUserPosition) {
    userPositionAndSetter.current = newUserPosition;
    console.log(userPositionAndSetter.current);
  }

  function saveUserPosition() {
    setUserPosition({ positionX: window.scrollX, positionY: window.scrollY });
  }

  function restoreUserPosition() {
    console.log(userPositionAndSetter.current);
    window.scrollTo(
      userPositionAndSetter.current.positionX,
      userPositionAndSetter.current.positionY
    );
  }

  return (
    <UserPositionInListContext.Provider
      value={{
        userPosition: userPositionAndSetter.current,
        saveUserPosition,
        restoreUserPosition,
      }}
    >
      {children}
    </UserPositionInListContext.Provider>
  );
}
