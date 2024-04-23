import { Product } from '@/app/models/produits';
import create from 'zustand';

interface CartStore {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  submitCart: (userId: string) => Promise<void>;
}

const localStorageKey = 'cart';

export const useCartStore = create<CartStore>((set) => {
  const storedCart = localStorage.getItem(localStorageKey);
  const initialCart = storedCart ? JSON.parse(storedCart) : [];

  return {
    cart: initialCart,
    addToCart: (product) =>
      set((state) => {
        const newCart = [...state.cart, product];
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      }),
    removeFromCart: (productId) =>
      set((state) => {
        const newCart = state.cart.filter((item) => item._id !== productId);
        localStorage.setItem(localStorageKey, JSON.stringify(newCart));
        return { cart: newCart };
      }),
    clearCart: () => {
      localStorage.removeItem(localStorageKey);
      set({ cart: [] });
    },
    submitCart: async (email: string) => {
      if (!email) {
        throw new Error('User ID is required to submit cart');
      }
    
      const cartData = {
        email,
        products: useCartStore.getState().cart.map((product) => product._id),
      };
    
      try {
        const response = await fetch('http://localhost:3000/api/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartData), 
        });
    
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
    
        console.log('Cart successfully submitted'); 
        useCartStore.getState().clearCart();
      } catch (error) {
        console.error('Error submitting cart:', error);
      }
    },
  };
});