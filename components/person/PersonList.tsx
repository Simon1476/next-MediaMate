import { PopularPerson } from "@/types/tmdb";
import PersonCard from "./PersonCard";
import Pagination from "../pagination/Pagination";

const PersonList = ({
  peopleLists,
  totalPage,
  currentPage,
}: {
  peopleLists: PopularPerson[];
  totalPage: number;
  currentPage: number;
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center lg:justify-between">
        {peopleLists.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
      <Pagination totalPage={totalPage} currentPage={currentPage} />
    </>
  );
};

export default PersonList;
