import React from "react";
import CategorySwiper from "../CategorySwiper/CategorySwiper";
import getAllCategories from "@/api/AllCategories";
export default async function CategorySlider() {
  const data = await getAllCategories();

  return (
    <>
      <CategorySwiper data={data} />
    </>
  );
}
