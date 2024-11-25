import { Skeleton } from "@/components/ui/skeleton";

interface FavoriteMediaListSkeletonProps {
  count?: number;
}

const FavoriteMediaListSkeleton = ({
  count = 10,
}: FavoriteMediaListSkeletonProps) => {
  return (
    <div className="mx-auto space-y-6 max-w-7xl">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col md:flex-row">
          {/* 포스터 이미지 스켈레톤 */}
          <div className="self-center">
            <Skeleton className="w-[220px] h-[330px] bg-gray-200" />{" "}
            {/* 배경색 추가 */}
          </div>

          {/* 콘텐츠 영역 스켈레톤 */}
          <div className="flex flex-col justify-between flex-1 px-8 py-8">
            <div>
              {/* 제목과 날짜 스켈레톤 */}
              <div className="space-x-4">
                <Skeleton className="inline-block w-40 h-6 bg-gray-200" />
                <Skeleton className="inline-block w-24 h-6 bg-gray-200" />
              </div>
              {/* 설명 텍스트 스켈레톤 */}
              <div className="pt-10">
                <Skeleton className="w-full h-20 bg-gray-200" />
              </div>
            </div>
            {/* 버튼 영역 스켈레톤 */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Skeleton className="w-20 h-8 bg-gray-200" />
              <Skeleton className="w-20 h-8 bg-gray-200" />
              <Skeleton className="w-16 h-8 bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteMediaListSkeleton;
