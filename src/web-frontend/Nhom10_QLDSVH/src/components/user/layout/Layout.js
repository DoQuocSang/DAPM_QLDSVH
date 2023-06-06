import React from "react";
import { Outlet } from "react-router-dom";
import CatDefault from "images/cat-404-full-2.png"

export default () => {

  return (
    <>
      <img src={CatDefault} className="max-w-screen-lg h-auto mx-auto my-12"/>
    </>
  );
};
