"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, loginSchemaForm } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function Login() {
  const form = useForm<loginSchemaForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaForm) {
    console.log(values);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("You Logged in Successfully ❤", {
        position: "top-center",
        duration: 3000,
      });
      window.location.href = "/";
    } else {
      toast.error(response?.error, {
        position: "top-center",
        duration: 3000,
      });
    }

    // try {
    //   let res = await axios.post(
    //     `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    //     values
    //   );
    //   if (res.data.message === "success") {
    //     toast.success("You Logged in Successfully", {
    //       position: "top-center",
    //       duration: 3000,
    //     });
    //     router.push("/");
    //   }
    // } catch (err) {
    //   toast.error(err.response.data.message, {
    //     position: "top-center",
    //     duration: 3000,
    //   });
    // }
  }

  return (
    <>
      <div className="w-1/2 mx-auto my-12">
        <h1 className="text-3xl text-center font-bold my-4">Login Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email : </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password : </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full cursor-pointer mt-4">Login Now</Button>
            <Link
              href="/Forgetpassword/auth/forget-password"
              className="hover:text-main"
            >
              forget your password ?
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
}
