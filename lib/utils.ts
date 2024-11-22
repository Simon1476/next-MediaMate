import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}분`;
  }

  return `${hours}시간 ${minutes}분`;
};

export const getTomorrowDate = (): string => {
  const currentDate = new Date();

  // 한국 시간대(KST)로 변환
  const koreaTimezoneOffset = 9 * 60 * 60 * 1000; // 한국은 UTC+9
  const koreaTime = new Date(currentDate.getTime() + koreaTimezoneOffset);

  // 날짜에 1일 추가
  koreaTime.setDate(koreaTime.getDate() + 1);

  // 'YYYY-MM-DD' 형식으로 날짜 변환
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
