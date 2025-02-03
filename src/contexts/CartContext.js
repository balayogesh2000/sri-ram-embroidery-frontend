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
    () => items.reduce((sum, { price, quantity }) => sum + price * quantity, 0),
    [items]
  );

  const addToCart = ({ productId, title, price, imageUploadId }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          { productId, title, price, quantity: 1, imageUploadId },
        ];
      }
    });
  };

  const removeFromCart = ({ productId }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );
      if (!existingItem) return prevItems;

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.productId !== productId);
      } else {
        return prevItems.map((item) =>
          item.productId === productId
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
