import selectedProduct from "@/api/SelectedProduct.";
import Details from "@/app/_components/Details/Details";
import SingleProduct from "@/app/_components/Navbar/SingleProduct/SingleProduct";
import getRelatedProducts from "@/ProducCategoryActioms/relatedProducts.action";
import { ProductType } from "@/types/product.type";
import React from "react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await selectedProduct(id);
  if (!data) {
    return <h1>No Products Here</h1>;
  }
  const RelatedProducts = await getRelatedProducts(data.category._id);
  console.log(RelatedProducts);
  console.log(data);
  return (
    <>
      <Details data={data} />
      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {RelatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct.id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
