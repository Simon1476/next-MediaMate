import { getPersonDetail } from "@/lib/tmdb";
import Image from "next/image";

const PersonDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const personDetail = await getPersonDetail(id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-6">
        <div>
          <Image
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${personDetail.profile_path}`}
            alt={`${personDetail.name} profile`}
            width={300}
            height={450}
            className="rounded-md"
          />
        </div>
        <div className="space-y-4 text-white md:space-y-8">
          <h2 className="text-32">{personDetail.name}</h2>
          <div className="space-y-4">
            <p className="flex flex-col">
              <span className="font-semibold text-20">출생지</span>
              <span>{personDetail.place_of_birth}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-semibold text-20">생일</span>
              <span>{personDetail.birthday}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-semibold text-20">전문 분야</span>
              <span>{personDetail.known_for_department}</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-white text-24">약력</h3>
        {personDetail.biography.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index} className="mb-4 text-white">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PersonDetail;
