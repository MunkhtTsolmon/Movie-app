"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/constants/types";
import Link from "next/link";
import { title } from "process";

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
  const [movies, setMovies] = useState<Movie[]>();
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
  const imgPath = movies?.poster_path ?? movies?.backdrop_path;
  const src = imgPath
    ? `https://image.tmdb.org/t/p/original/${imgPath}`
    : "https://via.placeholder.com/500";
  return (
    <div className="absolute m-auto top-20 md:top-14 bg-background rounded-lg shadow-lg z-10">
      {!movies ? (
        <p>loading...</p>
      ) : (
        <>
          <div className="p-3">
            {movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="h-[120px] flex">
                  <img src={src} className="w-[70px] h-[100px]" />
                  <div>
                    <h1 className="text-[16px] text-[black] font-medium">
                    {movie.title}
                  </h1>
                  <div className="flex items-center">
                    <p className="text-[1rem]">⭐️</p>
                    <div>
                      <p>{movie?.vote_average?.toFixed(1)}/10</p>
                    </div>
                  </div>
                  <div className="flex justify-between content-center">
                    <h4 className="text-[14px] font-medium">{movie.release_date}</h4>
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
