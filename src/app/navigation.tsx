"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const Navigation = () => {
  const [searchChange, setSearchChange] = useState(true);

  const changeSearch = () => {
    setSearchChange(!searchChange);
  };

  return (
    <>
      {searchChange ? (
        <NavigationOne changeSearch={changeSearch} />
      ) : (
        <NavigationTwo changeSearch={changeSearch} />
      )}
    </>
  );
};

const NavigationOne = ({ changeSearch }) => {
  return (
    <div className=" p-[2rem] flex justify-between">
      <div className="w-[5.75rem] flex gap-[0.3rem] text-indigo-700 items-center">
        <div className="w-[1.25rem] h-[1.25rem]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.83366 0.666748V17.3334M13.167 0.666748V17.3334M0.666992 9.00008H17.3337M0.666992 4.83341H4.83366M0.666992 13.1667H4.83366M13.167 13.1667H17.3337M13.167 4.83341H17.3337M2.48366 0.666748H15.517C16.5203 0.666748 17.3337 1.4801 17.3337 2.48341V15.5167C17.3337 16.5201 16.5203 17.3334 15.517 17.3334H2.48366C1.48034 17.3334 0.666992 16.5201 0.666992 15.5167V2.48341C0.666992 1.4801 1.48034 0.666748 2.48366 0.666748Z"
              stroke="#4338CA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-[1.1rem] italic mt-[-0.2rem]">Movie Z</p>
      </div>
      <div className="flex gap-[0.4rem]">
        <button onClick={changeSearch}>
          <Image src={"/search.png"} width={36} height={36} alt="search" />
        </button>
        <Image src={"/darkButton.png"} width={36} height={36} alt="dark" />
      </div>
    </div>
  );
};

const NavigationTwo = ({ changeSearch }) => {
  return (
    <div className=" p-[2rem] flex justify-between">
      <Select />
      <Input className="" />
      <button onClick={changeSearch}>x</button>
    </div>
  );
};
