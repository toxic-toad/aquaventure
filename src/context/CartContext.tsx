'use client';

import type { CartItem, Product, Order, CustomerDetails } from '@/types';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface CartState {
  items: CartItem[];
  lastOrder: Order | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LAST_ORDER'; order: Order }
  | { type: 'LOAD_CART'; items: CartItem[] };


const initialState: CartState = {
  items: [],
  lastOrder: null,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setLastOrder: (order: Order) => void;
}>({
  state: initialState,
  dispatch: () => null,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  setLastOrder: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.items };
    case 'ADD_ITEM':
      // eslint-disable-next-line no-case-declarations
      const existingItemIndex = state.items.findIndex(item => item.id === action.product.id);
      if (existingItemIndex > -1) {
        // eslint-disable-next-line no-case-declarations
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, { ...action.product, quantity: action.quantity }] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.productId ? { ...item, quantity: Math.max(0, action.quantity) } : item
        ).filter(item => item.quantity > 0), // Remove if quantity is 0
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_LAST_ORDER':
      return { ...state, lastOrder: action.order };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('aquaVentureCart');
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', items: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0 || localStorage.getItem('aquaVentureCart')) { // Avoid writing empty array on initial load if nothing was stored
        localStorage.setItem('aquaVentureCart', JSON.stringify(state.items));
    }
  }, [state.items]);


  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('aquaVentureCart');
  };
  
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const setLastOrder = (order: Order) => {
    dispatch({ type: 'SET_LAST_ORDER', order });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice, setLastOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
