/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";

const About = () => {
  const img1 =
    "https://d33wubrfki0l68.cloudfront.net/c3f66284b4ed4de2785a5fcc629be503d6399797/a13c0/assets/images/1.jpg";
  const img2 =
    "https://d33wubrfki0l68.cloudfront.net/8a1c15f9383dd799899c695372dd8a22715ebd4b/1a315/assets/images/2.jpg";
  const img3 =
    "https://d33wubrfki0l68.cloudfront.net/8a595f4793ed112a9a00389b1c99eb538e67eb39/84a3b/assets/images/3.jpg";
  return (
    <div id="about" className="min-h-full md:min-h-96 lg:min-h-96 p-8 md:px-16 flex lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex flex-col gap-4">
            <span className="font-semibold text-blue-500">WHO ARE WE</span>
            <h1 className="text-2xl md:text-5xl lg:text-5xl font-semibold">
              Assisting individuals in locating the appropriate real estate.
            </h1>
            <p className="text-sm">
              Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec
              dignissim purus. Nulla convallis ipsum molestie nibh malesuada, ac
              malesuada leo volutpat.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center p-4 flex-row">
              <TbSmartHome size={52} />
              <div>
                <span className="font-semibold text-blue-500">OUR MISSION</span>
                <p>Nullam a lacinia ipsum, nec dignissim purus. Nulla</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-4 flex-row">
              <IoPersonCircleOutline size={52} />
              <div>
                <span className="font-semibold text-blue-500">
                  Donec porttitor euismod
                </span>
                <p>Nullam a lacinia ipsum, nec dignissim purus. Nulla</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 md:grid-rows-2 lg:grid-rows-2 gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="row-span-1 md:row-span-2 lg:row-span-2 relative rounded-3xl overflow-clip">
            <Image src={img1} alt="image" className="object-cover" fill />
          </div>
          <div className="relative rounded-3xl overflow-clip">
            <img src={img2} alt="image" className="object-cover" />
          </div>
          <div className="relative rounded-3xl overflow-clip">
            <img src={img3} alt="image" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
