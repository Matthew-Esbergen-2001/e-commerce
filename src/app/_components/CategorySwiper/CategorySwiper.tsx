"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import React from "react";
import { CategoryType } from "@/types/category.type";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <>
      <div className="w-[80%] mx-auto hidden lg:block">
        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          {data.map((category: CategoryType) => (
            <SwiperSlide key={category._id}>
              <Image
                width={500}
                height={500}
                alt=""
                src={category.image}
                className="w-full object-center h-[150px]"
              />
              <p className="text-center font-bold">{category.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
