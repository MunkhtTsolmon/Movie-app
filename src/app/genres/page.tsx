"use client";
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
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../_components/navigation";
import { FilteredGenre } from "../_components/filteredGenre";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || "1";
  const genres = searchParams.get("with_genres");
  const pathName = usePathname();
  const router = useRouter();
  console.log(router);
  const [movies, setMovies] = useState<Movie[]>();
  const [dataGenre, setdataGenre] = useState();

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
  console.log(movies);
  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newUrl = pathName + "?" + newSearchParams.toString();
    router.push(newUrl);
  };
  console.log(dataGenre);
  return (
    <div>
      <Navigation />
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
      <div className="flex gap-1 px-[20px] py-[20px] text-[1.26rem] font-[600]">
        20 titles in
        {dataGenre
          ?.filter((id) => id.id == genres)
          .map((genresName) => (
            <h1 key={genresName.id}> {genresName.name}</h1>
          ))}
      </div>

      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
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
