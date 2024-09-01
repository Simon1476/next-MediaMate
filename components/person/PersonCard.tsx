import { PopularPerson } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

const PersonCard = ({ person }: { person: PopularPerson }) => {
  return (
    <div>
      <Link href={`/person/${person.id}`}>
        <Image
          src={`https://media.themoviedb.org/t/p/w235_and_h235_face/${person.profile_path}`}
          alt={person.name}
          width={235}
          height={235}
          className="w-full rounded-md"
        />
      </Link>
      <div className="py-2">
        <p className="text-white ">
          <Link href={`/person/${person.id}`}>{person.name}</Link>
        </p>
        <p className="text-white">{person.original_name}</p>
      </div>
    </div>
  );
};

export default PersonCard;
