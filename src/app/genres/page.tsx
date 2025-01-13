"use client";

import { Suspense, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MovieCard } from "../_components/movieCard";
import { Movie } from "@/constants/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FilteredGenre } from "../_components/filteredGenre";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

function PageContent() {
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || "1";
  const genres = searchParams.get("with_genres");
  const pathName = usePathname();
  const router = useRouter();
  const [movies, setMovies] = useState<any>();
  const [dataGenre, setdataGenre] = useState<any>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&language=en-US&page=${page}`,
        options
      );
      const responseTwo = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        options
      );
      const dataTwo = await responseTwo.json();
      const data = await response.json();
      setdataGenre(dataTwo?.genres);
      setMovies(data?.results);
    };
    fetchMovies();
  }, [genres, page]);

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newUrl = pathName + "?" + newSearchParams.toString();
    router.push(newUrl);
  };

  return (
    <div>
      <div className="block sm:hidden">
        <div className="px-[20px] pb-[20px]">
          <div className="text-[#09090B] text-[1.5rem] font-[600] py-5">
            Search filter
          </div>
          <div className="text-[#09090B] text-[1.25rem] font-[600] ">
            Search by genre
          </div>
          <div className="text-[#09090B] text-[1rem] ">
            See lists of movies by genre
          </div>
        </div>
        <div className="px-[20px]">
          <FilteredGenre />
        </div>
      </div>
      <div className="flex md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[10rem] ">
        <div className="w-[38%] lg:w-[30%] hidden sm:block">
          <div className="px-[20px] pb-[20px]">
            <div className="text-[#09090B] text-[1.5rem] font-[600] py-5">
              Search filter
            </div>
            <div className="text-[#09090B] text-[1.25rem] font-[600] ">
              Search by genre
            </div>
            <div className="text-[#09090B] text-[1rem] ">
              See lists of movies by genre
            </div>
          </div>
          <div className="px-[20px]">
            <FilteredGenre />
          </div>
        </div>
        <div className="md:w-[57%] px-4 border-l-[1px]">
          <div className="flex gap-1 px-[20px] py-[20px] text-[1.26rem] font-[600]">
            20 titles in
            {dataGenre
              ?.filter((id: any) => id.id == genres)
              .map((genresName: any) => (
                <h1 key={genresName.id}> {genresName.name}</h1>
              ))}
          </div>
          <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {movies?.map((movie: Movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChangePage(parseInt(page) - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangePage(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangePage(2)}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangePage(3)}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => onChangePage(parseInt(page) + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
