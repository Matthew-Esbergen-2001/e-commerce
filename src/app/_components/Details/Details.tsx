import { ProductType } from "@/types/product.type";
import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import Image from "next/image";

export default function Details({data}: { data: ProductType }) {
  return (
    <>
      <div className="container w-full lg:w-[60%] mx-auto p-4 flex justify-center items-center">
        <div className="w-1/4">
          <div className="p-4">
            <Image width={500} height={500} src={data.imageCover} className="w-full" alt="" />
          </div>
        </div>
        <div className="w-3/4">
          <div className="p-4">
            <h1 className="text-2xl font-bold my-4">{data.title}</h1>
            <p>{data.description}</p>
            <p className="text-emerald-600 my-2">{data.category.name}</p>
            <div className="flex justify-between w-full">
              <span>{data.price} EGP</span>
              <span className=" ">
                {data.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-500"></i>
              </span>
            </div>
            <AddBtn id={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
