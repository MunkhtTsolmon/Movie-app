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

import { MovieCard } from "../../_components/movieCard";
import { Movie } from "@/constants/types";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/app/_components/navigation";

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
  const pathName = usePathname();
  const router = useRouter();
  console.log(router);
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      setMovies(data?.results?.slice(0, 10));
    };
    fetchMovies();
  }, [params.category, page]);

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newUrl = pathName + "?" + newSearchParams.toString();
    router.push(newUrl);
  };

  return (
    <div>
      <Navigation />
      <h1 className="font-semibold text-[1.625rem] p-4">
        {params?.category?.toUpperCase().replaceAll("_", " ")}
      </h1>
      <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
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
