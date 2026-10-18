"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
}

type Action =
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string };

interface State {
  products: Product[];
}

const initialProducts: Product[] = [
  { id: "1", title: "Wireless Mouse", category: "Accessories", price: 25 },
  { id: "2", title: "Gaming Keyboard", category: "Accessories", price: 75 },
  { id: "3", title: "27-inch Monitor", category: "Electronics", price: 300 },
  { id: "4", title: "Laptop Stand", category: "General", price: 40 },
];

function inventoryReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    default:
      return state;
  }
}

interface ContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const InventoryContext = createContext<ContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inventoryReducer, {
    products: initialProducts,
  });

  const addProduct = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  return (
    <InventoryContext.Provider
      value={{ products: state.products, addProduct, deleteProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}