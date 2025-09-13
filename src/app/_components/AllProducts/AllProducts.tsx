import getProducts from "@/api/products.api";
import React from "react";
import SingleProduct from "../Navbar/SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
  const data = await getProducts();

  return (
    <>
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {data.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
