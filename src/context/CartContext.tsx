"use client";
import getLoggedUserCart from "@/CartAction/getUserCart.action";
import React, {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface CartContextType {
  numberOfCartItem: number;
  setnumberOfCartItem: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartItem(sum);
      }
    } catch (err) {
      console.log(err,"not login");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
