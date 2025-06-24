import React from "react";
import NavLeft from "./navbar/nav-left";
import NavMain from "./navbar/nav-main";
import NavRight from "./navbar/nav-right";
import NavCategories from "./navbar/nav-categories";

export default async function Navbar() {
  return (
    <div className="container mx-auto py-2 px-4">
      <div
        className=" flex items-center justify-between gap-2 
      container mx-auto py-2 px-4 border-b"
      >
        <NavLeft />

        <NavMain />

        <NavRight />
      </div>
      <NavCategories />
    </div>
  );
}
