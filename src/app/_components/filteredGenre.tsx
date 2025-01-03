import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzk2OTBmOTgzMGNlODA0Yjc4OTRhYzFkZWY0ZjdlOSIsIm5iZiI6MTczNDk0OTM3MS43NDIsInN1YiI6IjY3NjkzOWZiYzdmMTcyMDVkMTBiMGIxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2r2TerxSJdZGmGVSLVDkk6nHT0NPqY4rOcxHtMNt0aE",
  },
};
type Genre = {
  genres: {};
  id: number;
  name: string;
};

export function FilteredGenre() {
  const [genre, setGenre] = useState<Genre[]>([]);
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        options
      );
      const resJson = await response.json();
      setGenre(resJson.genres);
    };
    fetchGenres();
  }, []);

  return (
    <div>
      {genre?.map((genres: Genre) => (
        <Link
          key={"genre" + genres.id}
          href={`/genres?with_genres=${genres.id}`}
        >
          <Badge variant="outline">{genres.name}</Badge>
        </Link>
      ))}
    </div>
  );
}
