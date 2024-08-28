"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TMDBMovie } from "@/types/tmdb";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import PreviousBtn from "/icons/left-arrow.svg";
import NextBtn from "/icons/right-arrow.svg";
import Link from "next/link";

export default function Carousel({ mediaList }: { mediaList: TMDBMovie[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative mt-10 embla group">
      <div className="w-full space-x-4 embla__viewport" ref={emblaRef}>
        <div className="px-4 embla__container">
          {mediaList.map((content) => {
            const poster = content.poster_path
              ? `https://image.tmdb.org/t/p/w300${content.poster_path}`
              : "/image/no-poster1.png"; // 'content.poster_path'가 있는지 확인하고 'poster' 경로를 설정합니다.

            return (
              <div className="px-4 embla__slide" key={content.id}>
                <Link href={`/movie/${content.id}`}>
                  <Image
                    src={poster}
                    alt={content.title}
                    width={300}
                    height={150}
                    className="rounded-md"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button
          className="absolute left-0 p-2 transition-opacity duration-300 ease-in-out -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer top-1/2 embla__prev group-hover:opacity-100"
          onClick={scrollPrev}
        >
          <PreviousBtn className="w-[24px] h-[24px]" />
        </button>
        <button
          className="absolute right-0 p-2 transition-opacity duration-300 ease-in-out -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer top-1/2 embla__prev group-hover:opacity-100"
          onClick={scrollNext}
        >
          <NextBtn className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
}
