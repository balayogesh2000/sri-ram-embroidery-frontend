"use client";

import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext({
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      ),
    [items]
  );

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (_id) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === _id);
      if (!existingItem) return prevItems;

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.product._id !== _id);
      } else {
        return prevItems.map((item) =>
          item.product._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const contextValue = {
    items,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
