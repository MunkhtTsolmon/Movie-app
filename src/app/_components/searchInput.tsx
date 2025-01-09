"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

type SearchInputprops = {
  value: string;
  handleChange: (_event: ChangeEvent<HTMLInputElement>) => void;
};
export function SearchInput({ value, handleChange }: SearchInputprops) {
  return (
    <div className="md:w-[30vw]">
      <Input
        className="w-[100%] md:border-[1px] rounded-md"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
