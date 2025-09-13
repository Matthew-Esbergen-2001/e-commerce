"use server";
import getMyToken from "@/utilities/getMyToken";

export async function removewish(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("No token found, user not authenticated");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token, // لازم كده
      },
    }
  );

  const payload = await res.json();
  return payload;
}
