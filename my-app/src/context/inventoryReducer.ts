export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export type InventoryState = {
  products: Product[];
};

export type InventoryAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'CLEAR_INVENTORY' };

export const initialInventoryState: InventoryState = {
  products: [
    { id: '1', name: 'Laptop Pro Max', category: 'Electronics', price: 78 },
    { id: '2', name: 'Mobile Phone', category: 'General', price: 50 },
    { id: '3', name: 'Wireless Mouse', category: 'Accessories', price: 25 },
    { id: '4', name: 'Gaming Keyboard', category: 'Accessories', price: 75 },
  ],
};

export function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'CLEAR_INVENTORY':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}