import { Movie } from "@/constants/types";
import { MovieCard } from "./movieCard";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
type Props = {
  endpoint: string;
  title: string;
};
export const Section = async ({ title, endpoint }: Props) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=30`,
    options
  );
  // .then((res) => res.json())
  // .then((data) => {
  //   console.log(data);
  // });
  const resJson = await response.json();
  const movies: Movie[] = resJson.results.slice(0, 10);
  return (
    <div className="p-3">
      <div className="flex justify-between">
        <h1 className="font-semibold">{title}</h1>
        <Link href={`/${endpoint}`}>
          <h1>See more →</h1>
        </Link>
      </div>
      <div
        key={movies.id}
        className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};
