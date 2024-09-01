import Link from "next/link";

const GenresList = ({
  genres,
  mediaType,
}: {
  genres: { id: number; name: string }[];
  mediaType: "movie" | "tv";
}) => {
  return (
    <div className="space-x-2">
      {genres.map((genre) => (
        <Link href="#" key={genre.id}>
          <button className="text-white" key={genre.id}>
            {genre.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default GenresList;
