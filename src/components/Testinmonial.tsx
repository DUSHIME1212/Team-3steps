import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import
{ Rate }
from
"antd"
;

const Testinmonial = () => {
  const testimonial = [
    {
      text: "She was attentive to our needs and worked tirelessly to find us the perfect home.",
      img: "https://i.pinimg.com/736x/9e/e6/6e/9ee66ebf6b34ff4438bf4609828d2052.jpg",
      name: "Barbara D. Smith",
      rating: 4.5,
    },
    {
      text: "She was attentive to our needs and worked tirelessly to find us the perfect home.",
      img: "https://i.pinimg.com/736x/9e/e6/6e/9ee66ebf6b34ff4438bf4609828d2052.jpg",
      name: "Barbara D. Smith",
      rating: 2,
    },
    {
      text: "She was attentive to our needs and worked tirelessly to find us the perfect home.",
      img: "https://i.pinimg.com/736x/9e/e6/6e/9ee66ebf6b34ff4438bf4609828d2052.jpg",
      name: "Barbara D. Smith",
      rating: 3,
    },
    {
      text: "She was attentive to our needs and worked tirelessly to find us the perfect home.",
      img: "https://i.pinimg.com/736x/9e/e6/6e/9ee66ebf6b34ff4438bf4609828d2052.jpg",
      name: "Barbara D. Smith",
      rating: 4,
    },
  ];
  return (
    <div id="test" className="w-full p-8 md:px-16 flex flex-col md:flex-row lg:flex-row items-center lg:px-32 min-h-96">
      <div className="mb-4 flex w-100 md:w-1/2 lg:w-1/2 flex-col gap-4">
        <span className="font-semibold text-blue-500">TESTIMONIALS</span>
        <h1 className="text-2xl md:text-5xl lg:text-5xl font-semibold">Look What Our Customers Say!</h1>
        <p className="text-sm">
          Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec
          dignissim purus.
        </p>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 min-h-96">
        <Carousel
          autoplay
          dotPosition="right"
          className="size-full rounded-xl overflow-clip"
        >
          {testimonial.map((item, index) => (
            <div
              key={index}
              // grid p-0 md:p-8 lg:p-8 place-items-center size-full 
              className="border-black min-h-96"
            >
              <div className="shadow-lg flex flex-col gap-4 p-8 rounded-xl">
                <h1 className="text-xl md:text-3xl lg:text-3xl italic">&quot;{item.text}&quot;</h1>
                <hr className="w-full bg-black/30 h-[2px]" />
                <div className="p-4 flex flex-row gap-4">
                  <div className="size-12 rounded-full overflow-clip relative">
                    <Image
                      src={item.img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold">{item.name}</span>
                    <>
                    <Rate disabled defaultValue={item.rating} />
                    </>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testinmonial;
