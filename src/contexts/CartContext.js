"use client";

import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext({
  products: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const total = useMemo(
    () =>
      products.reduce((sum, { price, quantity }) => sum + price * quantity, 0),
    [products]
  );

  const addToCart = ({ id, name, price }) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === id);
      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevProducts, { id, name, price, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setProducts((prevProducts) => {
      const productToRemove = prevProducts.find((p) => p.id === productId);
      if (!productToRemove) return prevProducts;

      if (productToRemove.quantity === 1) {
        return prevProducts.filter((p) => p.id !== productId);
      } else {
        return prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      }
    });
  };

  const clearCart = () => {
    setProducts([]);
  };

  const contextValue = {
    products,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
