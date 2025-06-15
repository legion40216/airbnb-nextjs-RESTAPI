"use client";
import React from "react";
import DropDownNav from "./nav-right/drop-down-nav";
import UserMenu from "./nav-right/user-menu";
import RentHomeButton from "./nav-right/rent-home-btn";

export default function NavRight() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <RentHomeButton />

        <DropDownNav />

        <UserMenu />
      </div>
    </div>
  );
}
