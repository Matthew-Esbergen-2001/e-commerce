import React from "react";
import Image from "next/image";
import notfound from "../../public/images/404 copy.png";

export default function NotFound() {
  return (
    <>
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <Image src={notfound} alt="not-found image" />
        <p className="text-xl">
          Sorry, the page you are looking for was not found.
        </p>
      </div>
    </>
  );
}
