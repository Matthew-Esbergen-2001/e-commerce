"use client";
import AddToCart from "@/CartAction/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("AddBtn must be used within a CartContextProvider");
  }

  const { numberOfCartItem, setnumberOfCartItem } = cart;

  async function checkAddProduct(id: string) {
    const res = await AddToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product added successfully 👌", {
        position: "top-center",
        duration: 2000,
      });
      setnumberOfCartItem(numberOfCartItem + 1);
    } else {
      toast.error(res.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        className="cursor-pointer w-full"
      >
        Add To Cart
      </Button>
    </>
  );
}
