import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { GiRotaryPhone } from "react-icons/gi";
import { MdLocationCity } from "react-icons/md";

import React from "react";
function Footer() {
  return (
    <div className="w-full rounded-2xl bg-blue-300 p-3 text-xs dark:bg-zinc-700 sm:text-sm  md:text-base lg:text-xl">
      <p className="text-center text-lg font-semibold italic sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Myshop
      </p>
      <div className="md:mx-auto md:w-[70%] md:p-4">
        <ul className="flex flex-col gap-1 md:gap-2">
          <p className="mb-1 text-pink-800 dark:text-green-400">
            Our contact information:
          </p>
          <li className=" flex items-center gap-2 hover:text-pink-400 dark:hover:text-green-400">
            <AiOutlineMail className="text-xl" />
            <Link to={"mailto:dngocson12@gmail.com"}>
              : dngocson12@gmail.com
            </Link>
          </li>
          <li className=" flex  items-center gap-2  hover:text-pink-400 dark:hover:text-green-400">
            <GiRotaryPhone className="text-xl" />
            <Link to={"tel:+84942885082"}>: +84942885082</Link>
          </li>
          <li className=" flex  items-center gap-2  hover:text-pink-400 dark:hover:text-green-400">
            <MdLocationCity className="text-xl" />
            <Link to={"/about"}>
              : No. 40 Ba Huyen Thanh Quan, District 3, HCM city
            </Link>
          </li>
          <li className=" flex  items-center gap-2 hover:text-pink-400 dark:hover:text-green-400 ">
            <MdLocationCity className="text-xl" />
            <Link to={"/about"}>: No. 4 Le Duan, District 1, HCM city</Link>
          </li>
          <li className=" flex  items-center gap-2 hover:text-pink-400 dark:hover:text-green-400 ">
            <MdLocationCity className="text-xl" />
            <Link to={"/about"}>
              : 450 Truong Chinh, Tan Binh District, HCM city
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Footer;
