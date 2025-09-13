import getCatgory from "./_actions/getcagory";
import Image from "next/image";
import { Categorytype } from "./interface/catgorytype";

export default async function Categories() {
  const { data } = await getCatgory();

  return (
    <>
      <h1 className=" text-center m-5 text-2xl font-bold">All Categories</h1>

      <div className="container w-[80%] mx-auto my-12">
        <div className="flex flex-wrap">
          {data.map((cat: Categorytype) => (
            <div key={cat._id} className="w-full md:w-1/2 lg:w-1/4 ">
              <div className="prod p-4">
                <div
                  className="gap-2  border
             border-gray-200 rounded-lg shadow-sm overflow-hidden
               transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <a href="#">
                    <Image
                      className="w-full h-64 sm:h-72 md:h-80 object-center"
                      src={cat.image}
                      alt={cat.name}
                      width={400}
                      height={500}
                    />
                  </a>
                  <div className="p-5">
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-center text-main">
                      {cat.name}
                    </h5>
                  </div>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
