'use client'
import React, {useState } from 'react';
import { useCartStore } from '@/components/cartStore';
import { useUser } from '@clerk/nextjs';

const Cart = () => {
  const { user } = useUser();
  const { cart, removeFromCart, clearCart ,submitCart} = useCartStore();
  const [id, setId] = useState<string>("");



  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.map((cartItem) => (
        <div key={cartItem._id} className="flex items-center mb-2">
          <p className="flex-grow">{cartItem.Marque}</p>
          <button onClick={() => removeFromCart(cartItem._id)} className="text-red-600 hover:underline">Remove from Cart</button>
        </div>
      ))}
      <button onClick={() => {submitCart(user?.emailAddresses[0].toString()||"aa");clearCart()} }className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Submit Cart</button><button onClick={clearCart} className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Clear Cart</button>
    </div>
  );
};

export default Cart;