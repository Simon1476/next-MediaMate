import { PopularPerson } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

const PersonCard = ({ person }: { person: PopularPerson }) => {
  return (
    <div className="p-3">
      <Link href={`/person/${person.id}`}>
        <Image
          src={`https://media.themoviedb.org/t/p/w235_and_h235_face/${person.profile_path}`}
          alt={person.name}
          width={235}
          height={235}
        />
      </Link>
      <div>
        <p>
          <Link href={`/person/${person.id}`}>{person.name}</Link>
        </p>
        <p>{person.original_name}</p>
      </div>
    </div>
  );
};

export default PersonCard;
