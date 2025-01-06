"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

type SearchInputprops = {
  value: string;
  handleChange: (_event: ChangeEvent<HTMLInputElement>) => void;
};
export function SearchInput({ value, handleChange }: SearchInputprops) {
  return (
    <div>
      <Input className="w-[100%]" value={value} onChange={handleChange} />
    </div>
  );
}
