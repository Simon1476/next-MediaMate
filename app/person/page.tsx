import PersonList from "@/components/person/PersonList";
import { getPopularPeople } from "@/lib/tmdb";

const Person = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const currentPage = Number(searchParams?.page) || 1;

  const peopleLists = await getPopularPeople(currentPage);

  return (
    <>
      <h2 className="text-white text-32 mb-6">인기 인물</h2>
      <PersonList
        peopleLists={peopleLists.results}
        totalPage={peopleLists.total_pages}
        currentPage={currentPage}
      />
    </>
  );
};

export default Person;
