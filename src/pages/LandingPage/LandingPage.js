import React from "react";
import LadingPageCarosel from "./LadingPageCarosel";
import aManImage from "../../assets/img/person.png";
import shopping from "../../assets/img/pngegg.png";
import wear from "../../assets/img/quanao.png";
import machine from "../../assets/img/machine.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LandingPage = () => {
  localStorage.setItem("redirectUrl", window.location.href);
  const shopItem = useSelector((state) => state.shop.shopItem);
  const clothes = shopItem.filter(
    (item) =>
      item.category === "men's clothing" ||
      item.category === "jewelery" ||
      item.category === "women's clothing"
  );
  const electronic = shopItem.filter((item) => item.category === "electronics");

  return (
    <div className="mx-auto  min-h-[100vh] max-w-[100rem] overflow-hidden p-4">
      <div className="flex flex-col gap-5">
        <div className="grid  items-center justify-center md:grid-cols-2">
          <div className="">
            <div className="mb-4 flex flex-col gap-1 ">
              <h1>Future is here,</h1>
              <h1>Start exploring now.</h1>
            </div>
            <p className="leading-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
              eius distinctio odit, magni magnam qui ex perferendis vitae!
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <img src={aManImage} alt="person" />
          </div>
          <div className="order-4 flex w-full items-center justify-center md:order-3">
            <img className="max-w-[90%]" src={shopping} alt="person" />
          </div>
          <div className="order-3 mb-4 flex flex-col gap-1 md:order-4">
            <h1>In here we have every that you need</h1>
            <p className="leading-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
              eius distinctio odit, magni magnam qui ex perferendis vitae sorem
              ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <h2>Come and discover the fashion we have in store for you!</h2>
        <div className="w-full">
          <p className="leading-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            eius distinctio odit, magni magnam qui ex perferendis vitae!
          </p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <img
              className="h-full w-full md:max-w-[90%]"
              src={wear}
              alt="wearitems"
            />
            <LadingPageCarosel items={clothes} />
          </div>
        </div>
        <h2 className="select-none">
          We also provide a wide range of electronic devices
        </h2>
        <div className="w-full">
          <p className="leading-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
            eius distinctio odit, magni magnam qui ex perferendis vitae!
          </p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <LadingPageCarosel items={electronic} />
            </div>
            <img
              className="order-1 h-[230px] w-full md:order-2 md:h-full md:max-w-[90%]"
              src={machine}
              alt="wearitems"
            />
          </div>
        </div>
      </div>
      <h3 className="mt-2 md:mt-5">Discover all of our products</h3>
      <Link to={"/allProduct"} className="">
        <h4 className="my-3 inline-block  animate-bounce rounded-2xl bg-blue-400 p-2 hover:bg-blue-500 dark:bg-green-400 dark:hover:bg-green-500">
          Click here
        </h4>
      </Link>
    </div>
  );
};

export default LandingPage;
