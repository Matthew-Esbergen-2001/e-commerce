"use server";

type reset = {
  email: string;
  newPassword: string;
};

export async function resetpass({ email, newPassword }: reset) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
      cache: "no-store",
    }
  );

  console.log("Reset API status:", res.status);

  const text = await res.text();
  console.log("Raw API response:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("API did not return JSON. Got HTML instead.");
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || "Reset API failed");
  }

  return data;
}
