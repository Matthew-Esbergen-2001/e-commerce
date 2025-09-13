"use client";
import { addProductToCart as add } from "./addproduct.action";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
export default function ProductItemBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationFn: add,
    onSuccess: (data) => {
      toast.success("Product successfully added to cart", {
        position: "top-center",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["/cart"] });
    },
    onError: (data) => {
      toast.error("Login first", {
        position: "top-center",
        duration: 3000,
      });
    },
  });
  // console.log(data)
  return (
    <Button className="bg-green-500 w-full" onClick={() => mutate(id)}>
      {" "}
      {isPending ? (
        <i className="fa-solid fa-spin fa-spinner"></i>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
