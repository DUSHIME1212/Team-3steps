import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon } from "lucide-react";

const HeroTeam = () => {
  const team = [
    {
      name: "Denyse",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-06 at 21.08.00_392c5ccd.jpg",
    },
    {
      name: "Dushime Aime",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-06 at 21.26.13_27c83195.jpg",
    },
    {
      name: "Pedro",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-06 at 21.26.58_38b5fe98.jpg",
    },
    {
      name: "Stacey",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-06 at 21.31.22_1a2b404e.jpg",
    },
    {
      name: "Egide",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-06 at 21.43.02_7e76ea24.jpg",
    },
    {
      name: "Honorine",
      linkedin: "",
      github: "",
      image: "/grp/WhatsApp Image 2024-11-28 at 22.23.54_5f75ec17.jpg",
    },
  ];
  return (
    <div className="min-h-[720px] w-full p-8 md:px-16 lg:px-32 flex flex-col gap-8 justify-start items-start">
      <h1 className="text-5xl ">Meet our team</h1>
      <div className="grid w-full lg:grid-cols-3 gap-4 md:grid-rows-6 grid-rows-2 lg:grid-rows-2">
        {team.map((items, i) => (
          <div key={i} className="p-4 min-h-96 text-white overflow-clip group rounded-2xl relative">
            <Image
              src={items.image}
              alt=""
              className="w-full object-cover object-top"
              fill
            />
            <div className="absolute size-full bg-gradient-to-b top-0 left-0 from-white/0 to-black z-10" />
            <div className="absolute -bottom-8 group-hover:bottom-10 duration-500 left-0 px-4 flex flex-col gap-4 z-40 w-full">
              <h2 className="text-2xl">{items.name}</h2>
              <div className="w-full grid grid-cols-2 gap-4">
                <Button className="bg-white/20 border-0 border-white backdrop-blur-md" asChild>
                    <Link href={""}><FacebookIcon/></Link>
                </Button>
                <Button className="bg-white/20 border-0 border-white backdrop-blur-md" asChild>
                    <Link href={""}><LinkedinIcon/></Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTeam;
