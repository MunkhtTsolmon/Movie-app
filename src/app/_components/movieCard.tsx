import { Movie } from "@/constants/types";
import Link from "next/link";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const imgPath = movie?.poster_path ?? movie?.backdrop_path;
  const src = imgPath
    ? `https://image.tmdb.org/t/p/original/${imgPath}`
    : "https://via.placeholder.com/500";
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="rounded-lg bg-secondary w-fit h-fit">
        <img src={src} className="rounded-t-lg w-[500px]" />
        <div className="p-2">
          <div className="flex items-center gap-5">
            <p>⭐️ {movie.vote_average.toFixed(1)}/10</p>
          </div>
          <p>{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};
