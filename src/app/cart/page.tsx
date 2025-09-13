"use client";
import ClearCart from "@/CartAction/clearCartItem.action";
import getLoggedUserCart from "@/CartAction/getUserCart.action";
import RemoveItemFromCart from "@/CartAction/removeCartItem.action";
import UpdateCartQuantity from "@/CartAction/updateCartQuantity.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Cart() {
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [removeDesiable, setremoveDesiable] = useState(false);
  const [updateDesable, setupdateDesable] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }

  const { numberOfCartItem, setnumberOfCartItem } = cartContext;
  const [total, settotal] = useState(0);
  const [cartId, setcartId] = useState("");

  async function getuserCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        settotal(res.data.totalCartPrice);
        setcartId(res.data._id);
        setproducts(res.data.products);
        setisLoading(false);
      }
    } catch (err) {
      console.log(err);
      setisLoading(false);
    }
  }
  async function deleteProducts(id: string) {
    setremoveDesiable(true);
    setupdateDesable(true);
    const res = await RemoveItemFromCart(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product Deleted Successfully", {
        position: "top-center",
        duration: 2000,
      });
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      getuserCart();
      setnumberOfCartItem(sum);
      setupdateDesable(false);
      setremoveDesiable(false);
    } else {
      toast.error("can't delete is product now ! ", {
        position: "top-center",
        duration: 2000,
      });
      setremoveDesiable(false);
      setupdateDesable(false);
    }
  }
  async function updateProducts(id: string, count: string, sign: string) {
    setcurrentId(id);
    setupdateDesable(true);
    setloadingUpdate(true);
    setremoveDesiable(true);
    const res = await UpdateCartQuantity(id, count);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Quantity updated Successfully", {
        position: "top-center",
        duration: 2000,
      });
      if (sign === "+") {
        setnumberOfCartItem(numberOfCartItem + 1);
      } else if (sign === "-") {
        setnumberOfCartItem(numberOfCartItem - 1);
      }
      getuserCart();
      setupdateDesable(false);
      setloadingUpdate(false);
      setremoveDesiable(false);
    } else {
      toast.error("can't update this quantity now ! ", {
        position: "top-center",
        duration: 2000,
      });
      setremoveDesiable(false);
      setloadingUpdate(false);
      setremoveDesiable(false);
    }
  }
  async function clear() {
    const res = await ClearCart();
    if (res.message === "success") {
      getuserCart();
    }
  }
  useEffect(() => {
    getuserCart();
  }, []);
  if (isLoading) {
    return (
      <h1 className="text-center font-bold text-slate-900 text-3xl my-12">
        Loading.....
      </h1>
    );
  }
  return (
    <>
      {products.length > 0 ? (
        <div className="w-2/3 mx-auto my-12">
          <div className="flex justify-end">
            <Button
              onClick={() => clear()}
              className="cursor-pointer bg-red-500 hover:bg-red-700 my-4"
            >
              Clear Cart Item
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-center text-3xl font-bold text-emerald-600">
              Total Cart Price : {total}
            </h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProductType) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                        width={500}
                        height={500}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={updateDesable}
                          onClick={() =>
                            updateProducts(
                              product.product.id,
                              `${product.count - 1}`,
                              "-"
                            )
                          }
                          className="inline-flex items-center disabled:bg-slate-300 justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        {product.product.id === currentId ? (
                          loadingUpdate ? (
                            <i className=" fas fa-spinner fa-spin"></i>
                          ) : (
                            <span>{product.count}</span>
                          )
                        ) : (
                          <span>{product.count}</span>
                        )}
                        <button
                          disabled={updateDesable}
                          onClick={() =>
                            updateProducts(
                              product.product.id,
                              `${product.count + 1}`,
                              "+"
                            )
                          }
                          className="inline-flex items-center disabled:bg-slate-300 justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={removeDesiable}
                        onClick={() => deleteProducts(product.product.id)}
                        className="text-red-500 font-semibold cursor-pointer disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href={`/checkout/${cartId}`}>
            <Button className="bg-blue-600 text-white w-full  cursor-pointer my-4 p-6">
              Checkout Now
            </Button>
          </Link>
        </div>
      ) : (
        <h1 className="text-center font-bold text-red-600 text-3xl my-12">
          No Products added yet !
        </h1>
      )}
    </>
  );
}
