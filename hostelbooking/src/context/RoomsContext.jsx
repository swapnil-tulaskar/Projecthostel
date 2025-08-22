import React, { createContext, useState, useContext } from "react";

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([
    {
      room: "Room 101",
      beds: [
        { id: 1, vacant: true },
        { id: 2, vacant: false },
        { id: 3, vacant: true },
      ],
    },
    {
      room: "Room 102",
      beds: [
        { id: 4, vacant: true },
        { id: 5, vacant: false },
      ],
    },
  ]);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomsContext);
}
