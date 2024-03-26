import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useCartStore } from '@/components/cartStore';
import Cart from "@/components/cart";

export default function App() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { cart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
        <p className="font-bold text-inherit">Wafir</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex" >
          <Link href="#" onClick={handleCartClick}>cart</Link>
          {isCartOpen && (
            <div className="absolute bg-white shadow-md rounded-md p-4" onClick={closeCart}>
              <Cart />
            </div>
          )}
          {userId ? <UserButton /> : <Link href='/sign-in'>SignIn</Link>}
          
        </NavbarItem>
        <NavbarItem>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}