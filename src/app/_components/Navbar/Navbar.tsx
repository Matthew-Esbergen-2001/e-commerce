"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const numberOfCartItem = cartContext?.numberOfCartItem ?? 0;
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <nav className="bg-emerald-600 text-white text-center">
        <div className="container w-full lg:w-[80%] mx-auto p-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center gap-2">
            <Link href="/">
              <i className="fa-solid fa-cart-shopping"></i> Freshcart
            </Link>
          </div>

          {/* Hamburger button - يظهر في الموبايل */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Main menu */}
          <div className="hidden md:flex justify-between items-center gap-8">
            <ul className="flex gap-6 items-center">
              <li>
                <Link href="/">Home</Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link className="relative" href="/cart">
                      Cart
                      {numberOfCartItem > 0 && (
                        <span
                          className="absolute top-[-10px] end-[-10px] flex size-5 bg-white
                       text-emerald-600 rounded-full justify-center items-center text-xs"
                        >
                          {numberOfCartItem}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link href="/wish-list">Wishlist</Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>

            <ul className="flex gap-4 items-center">
              {!session ? (
                <>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="cursor-pointer" onClick={logout}>
                      Signout
                    </span>
                  </li>
                  {session && <li>Hi {session?.user.name}</li>}
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile menu - يظهر فقط لما تضغط على الهامبرجر */}
        {isOpen && (
          <div className="md:hidden bg-emerald-700 p-4 space-y-3">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/">Home</Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link className="relative" href="/cart">
                      Cart
                      {numberOfCartItem > 0 && (
                        <span
                          className="absolute top-[-10px] end-[-10px] flex size-5 bg-white
                       text-emerald-600 rounded-full justify-center items-center text-xs"
                        >
                          {numberOfCartItem}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link href="/wish-list">Wishlist</Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>

            <ul className="flex flex-col gap-3 mt-4">
              {!session ? (
                <>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span className="cursor-pointer" onClick={logout}>
                      Signout
                    </span>
                  </li>
                  {session && <li>Hi {session?.user.name}</li>}
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
