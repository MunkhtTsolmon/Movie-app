"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilteredGenre } from "./filteredGenre";
import { SearchForMainPage } from "./searchMain";

export const Navigation = () => {
  const [searchChange, setSearchChange] = useState(true);

  const [theme, setTheme] = useState(`light`);

  useEffect(() => {
    document.documentElement.classList.toggle(`dark`, theme === `dark`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === `light` ? `dark` : `light`);
  };

  const changeSearch = () => {
    setSearchChange(!searchChange);
  };

  return (
    <>
      {searchChange ? (
        <NavigationOne
          theme={theme}
          toggleTheme={toggleTheme}
          changeSearch={changeSearch}
        />
      ) : (
        <NavigationTwo changeSearch={changeSearch} />
      )}
    </>
  );
};

const NavigationOne = ({ changeSearch, toggleTheme, theme }: any) => {
  return (
    <div className=" p-[2rem] flex justify-between">
      <Link className="content-center" href="#">
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
      </Link>
      <div className="max-w-full p-[2rem] md:flex gap-2 justify-between content-center hidden">
        <Popover>
          <PopoverTrigger>
            <div className="h-[40px] w-[36px] md:w-fit md:p-2 border-[1px] rounded-md flex justify-center items-center cursor-pointer">
              <ChevronDown className="w-[20px] h-[20px] opacity-50" />
              <h1 className="text-[16px] font-medium opacity-50 ">Genre</h1>
            </div>
          </PopoverTrigger>
          <PopoverContent className="absolute top-8 left-1/2 bg-background rounded-lg shadow-lg z-10">
            <FilteredGenre />
          </PopoverContent>
        </Popover>
        <div className="flex">
          <SearchForMainPage />
        </div>
      </div>
      <div className="flex gap-[0.4rem] items-center">
        <button className="block md:hidden" onClick={changeSearch}>
          {theme == "light" ? (
            <Image src={"/search.png"} width={36} height={36} alt="search" />
          ) : (
            <Image
              src={"/searchDark.png"}
              width={36}
              height={36}
              alt="search"
            />
          )}
        </button>
        {theme == "light" ? (
          <Image
            src={"/darkButton.png"}
            width={36}
            height={36}
            className="md:h-[40px] md:w-[40px] md:mr-[1.5vw]"
            alt="dark"
            onClick={toggleTheme}
          />
        ) : (
          <Image
            src={"/darkBtnDark.png"}
            width={36}
            height={36}
            className="md:h-[40px] md:w-[40px] md:mr-[1.5vw]"
            alt="dark"
            onClick={toggleTheme}
          />
        )}
      </div>
    </div>
  );
};

const NavigationTwo = ({ changeSearch }: any) => {
  return (
    <div className="max-w-full p-[2rem] flex justify-between content-center">
      <Popover>
        <PopoverTrigger>
          <div className="h-[36px] w-[36px] border-[1px] rounded-md flex justify-center items-center cursor-pointer">
            <ChevronDown className="w-[20px] h-[20px]" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="absolute top-8 left-1/2 bg-background rounded-lg shadow-lg z-10">
          <FilteredGenre />
        </PopoverContent>
      </Popover>
      <div className="flex">
        <SearchForMainPage />
        <button
          onClick={changeSearch}
          className="flex justify-center items-center w-[36px] h-[36px]"
        >
          <p className="font-light text-[26px] leading-none">x</p>
        </button>
      </div>
    </div>
  );
};
