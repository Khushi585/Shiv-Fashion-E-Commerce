import React, { createContext, useContext, useState } from "react";

const FestivalContext = createContext();

export const FestivalProvider = ({ children }) => {
  const [festivals, setFestivals] = useState([
    {
      name: "Diwali Dhamaka Offer",
      products: [
        { id: 1, title: "LED Lights", price: 299, image: "/img/led.jpg" },
        { id: 2, title: "Crackers", price: 499, image: "/img/crackers.jpg" },
      ],
    },
  ]);

  const addFestival = (festivalName) => {
    setFestivals([
      ...festivals,
      { name: festivalName, products: [] }
    ]);
  };
  
  const addProduct = (festivalName, product) => {
    setFestivals(
      festivals.map((f) =>
        f.name === festivalName
          ? { ...f, products: [...f.products, product] }
          : f
      )
    );
  };

  return (
    <FestivalContext.Provider value={{ festivals, addFestival, addProduct }}>
      {children}
    </FestivalContext.Provider>
  );
};

export const useFestival = () => useContext(FestivalContext);
