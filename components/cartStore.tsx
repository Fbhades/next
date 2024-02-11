// src/components/cartStore.ts
import { Product } from '@/app/models/produits';
import create from 'zustand';

interface CartStore {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const localStorageKey = 'cart';

export const useCartStore = create<CartStore>((set) => {
  // Load cart data from localStorage if available
  const storedCart = localStorage.getItem(localStorageKey);
  const initialCart = storedCart ? JSON.parse(storedCart) : [];

  return {
    cart: initialCart,
    addToCart: (product) =>
      set((state) => {
        const newCart = [...state.cart, product];
        // Save updated cart to localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      }),
    removeFromCart: (productId) =>
      set((state) => {
        const newCart = state.cart.filter((item) => item._id !== productId);
        // Save updated cart to localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      }),
    clearCart: () => {
      // Clear cart in state and localStorage
      localStorage.removeItem(localStorageKey);
      set({ cart: [] });
    },
  };
});
