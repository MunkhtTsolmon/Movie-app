import { MovieCard } from "@/app/_components/movieCard";
import { Navigation } from "@/app/_components/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Movie } from "@/constants/types";

type Props = {
  params: {
    id: string;
  };
};
type Genre = {
  id: number;
  name: string;
};
type Director = {
  job: string;
  name: string;
};
type Writers = {
  job: string;
  name: string;
  department: string;
};
type Stars = {
  name: string;
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
export default async function Page({ params }: Props) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}`,
    options
  );

  const data = await response.json();
  const responseTwo = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits`,
    options
  );
  const credits = await responseTwo.json();
  console.log(credits);
  const responseThree = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/recommendations`,
    options
  );
  const recommendations = await responseThree.json();
  const movies = recommendations.results.slice(0, 2);
  console.log(recommendations);

  const minuteConverter = (minutes: number) => {
    let hours = Math.floor(minutes / 60);
    let minutesDivised = minutes % 60;
    const newRuntime = `${hours}h ${minutesDivised}m`;
    return newRuntime;
  };
  const imgPath = data?.poster_path ?? data?.backdrop_path;
  const src = imgPath
    ? `https://image.tmdb.org/t/p/w200/${imgPath}`
    : "https://via.placeholder.com/500";
  const imgPath1 = data?.backdrop_path;
  const src1 = imgPath1
    ? `https://image.tmdb.org/t/p/original/${imgPath1}`
    : "https://via.placeholder.com/500";
  return (
    <>
      <Navigation /> 
      <div className="p-[2rem]">
        <h1 className="text-[1.5rem] max-w-[13.75rem] text-[black] font-semibold">
          {data.title}
        </h1>
        <div className="flex justify-between">
          <p>
            {data.release_date.replaceAll("-", ".")} · {data.adult ? "PG" : "U"}{" "}
            · {minuteConverter(data.runtime)}
          </p>
          <div className="flex mt-[-3rem] items-center">
            <p className="text-[2rem]">⭐️</p>
            <div>
              <p>{data.vote_average.toFixed(1)}/10</p>
              <p>{data.vote_count}</p>
            </div>
          </div>
        </div>
        <img className="w-full h-[1/2]" src={src1} />
        <div className="flex gap-4 justify-between items-center mt-[2rem]">
          <img src={src} className="w-[6.25rem] h-[9.25rem]" />
          <div>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {data.genres.map((genre: Genre) => (
                <Badge variant="outline" key={genre.id}>
                  <p className="min-h-[20px] text-[12px]">{genre.name}</p>
                </Badge>
              ))}
            </div>
            <p className="mt-[1rem]">{data.overview}</p>
          </div>
        </div>
        <div>
          <div className="flex gap-8 border-b-[#E4E4E7] border-b-[1px] h-[41px] mt-[2rem]">
            <h1 className="font-bold w-[64px]">Director</h1>
            <div>
              {credits.crew
                .filter((director: Director) => director.job == "Director")
                .map((director: Director) => (
                  <h2>{director.name}</h2>
                ))}
            </div>
          </div>
          <div className="flex gap-8 border-b-[#E4E4E7] border-b-[1px] h-[41px] mt-[2rem]">
            <h1 className="font-bold w-[64px]">Writers</h1>
            <div>
              {credits.crew
                .filter((writers: Writers) => writers.department == "Writing")
                .slice(0, 3)
                .map((writers: Writers) => (
                  <h2>{writers.name}</h2>
                ))}
            </div>
          </div>
          <div className="flex gap-8 border-b-[#E4E4E7] border-b-[1px] h-[41px] mt-[2rem]">
            <h1 className="font-bold w-[64px]">Stars</h1>
            <div>
              {credits.cast.slice(0, 3).map((stars: Stars) => (
                <h2>{stars.name}</h2>
              ))}
            </div>
          </div>
        </div>
        <div className="flex mt-[5rem]">
          <h1>More like this</h1>
          <Link href={`/recommended/${data.id}`}>
            <p>See more →</p>
          </Link>
        </div>
        <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie: Movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
