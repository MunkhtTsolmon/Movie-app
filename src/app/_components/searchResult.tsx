"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/constants/types";
import Link from "next/link";

type SearchResultProps = {
  searchValue: string;
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
export const SearchResult = ({ searchValue }: SearchResultProps) => {
  const [movies, setMovies] = useState<any>();
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setMovies(data.results?.slice(0, 5));
      console.log(data);
    };

    fetchMovies();
  }, [searchValue]);
  console.log(movies);
  return (
    <div className="absolute left-1/2 top-[540px] transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg shadow-lg z-10">
      {!movies ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="p-3">
            {movies.map((movie: Movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="h-[160px] w-[280px] flex justify-between p-3 border-b-[1px]">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${
                      movie?.poster_path
                        ? movie?.poster_path
                        : "https://via.placeholder.com/500"
                    }`}
                    className="w-[80px] h-[130px]"
                  />
                  <div className="w-[151px] h-[140px] relative">
                    <h1 className="text-[16px] text-foreground font-semibold">
                      {movie.title}
                    </h1>
                    <div className="flex items-center">
                      <p className="text-[1rem]">⭐️</p>
                      <div>
                        <p>{movie?.vote_average?.toFixed(1)}/10</p>
                      </div>
                    </div>
                    <div className="flex bottom-2 gap-[30px] h-[36px] justify-between content-center absolute">
                      <h4 className="text-[14px] font-medium">
                        {movie.release_date.trim().slice(0, 4)}
                      </h4>
                      <h1 className="font-medium text-[14px]">See more →</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-3 pt-0">
            <Link
              href={`/search?query=${searchValue}`}
              className="py-2.5 px-4 text-foreground"
            >
              see all results for: {searchValue}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
