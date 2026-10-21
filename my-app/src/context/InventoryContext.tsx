'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSpeech } from '@/hooks/useSpeech';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
}

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id'> }
  | { type: 'DELETE_PRODUCT'; payload: string };

interface InventoryContextType {
  products: Product[];
  dispatch: React.Dispatch<Action>;
  speak: (text: string) => void;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Laptop Pro Max', category: 'Electronics', price: 1200 },
  { id: '2', name: 'Wireless Mouse', category: 'Accessories', price: 25 },
  { id: '3', name: 'Gaming Keyboard', category: 'Accessories', price: 75 },
  { id: '4', name: '27-inch Monitor', category: 'Electronics', price: 300 },
];

function inventoryReducer(state: Product[], action: Action): Product[] {
  let newState: Product[];
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      newState = [
        { ...action.payload, id: Date.now().toString() },
        ...state,
      ];
      break;
    case 'DELETE_PRODUCT':
      newState = state.filter((p) => p.id !== action.payload);
      break;
    default:
      return state;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('inventory_items', JSON.stringify(newState));
  }
  return newState;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, dispatch] = useReducer(inventoryReducer, initialProducts);
  const { speak } = useSpeech();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inventory_items');
      if (saved) {
        try {
          dispatch({ type: 'SET_PRODUCTS', payload: JSON.parse(saved) });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ products, dispatch, speak }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};