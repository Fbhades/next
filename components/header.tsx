// components/Header.tsx

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Wafir</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">cart</Link>
        </NavbarItem>
        <NavbarItem>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}