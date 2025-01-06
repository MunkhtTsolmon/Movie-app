"use client";

import { ChangeEvent, useState } from "react";
import { SearchInput } from "./searchInput";
import { SearchResult } from "./searchResult";

export const SearchForMainPage = () => {
  const [searchValue, setSearchValue] = useState<string>(``);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="">
      <SearchInput handleChange={handleChange} value={searchValue} />
      {searchValue && <SearchResult searchValue={searchValue} />}
    </div>
  );
};
