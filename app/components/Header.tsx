// app/components/Header.tsx
"use client";
import { PersonalPrivacy } from "@icon-park/react";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="w-full p-2 px-3.5 bg-[#1d2520] shadow-md flex justify-center">
      <div className="w-full flex justify-between px-2 h-14 items-center max-w-[1200px] text-white text-lg font-bold">
        <div>
          <Link href="/">
            <img
              src="./static/if_logo_simples.svg"
              alt=""
              className="h-11 cursor-pointer"
            />
          </Link>
        </div>

        <div>
          {/* <PersonalPrivacy theme="outline" size="26"/> */}
          <Menu></Menu>
        </div>
      </div>
    </header>
  );
}
