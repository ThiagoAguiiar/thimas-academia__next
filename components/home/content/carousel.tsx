'use client';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions, Swiper as SwiperType } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

interface ICarouselProps {
  cards: React.ReactNode[];
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
      spaceBetween?: number;
    };
  };
}

export function Carousel({ cards, breakpoints }: ICarouselProps) {
  const prev = React.useRef<HTMLDivElement | null>(null);
  const next = React.useRef<HTMLDivElement | null>(null);

  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(
    null
  );

  React.useEffect(() => {
    if (swiperInstance && swiperInstance.params && swiperInstance.navigation) {
      const navigation = swiperInstance.params.navigation as NavigationOptions;
      navigation.prevEl = prev.current;
      navigation.nextEl = next.current;

      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="space-y-5">
      <div className="flex justify-end pr-5 items-center gap-x-3">
        <div
          className="w-[40px] flex items-center justify-center h-[40px] transition-all border border-[#808080] hover:border-none hover:bg-black hover:text-white rounded-lg cursor-pointer"
          ref={prev}
        >
          <CaretLeft size={18} />
        </div>

        <div
          className="w-[40px] h-[40px] flex items-center justify-center border transition-all border-[#808080] hover:border-none hover:bg-black hover:text-white rounded-lg cursor-pointer"
          ref={next}
        >
          <CaretRight size={18} />
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation]}
        breakpoints={breakpoints}
        navigation={{
          prevEl: prev.current,
          nextEl: next.current,
        }}
        onSwiper={(e) => {
          setSwiperInstance(e);
        }}
      >
        {cards.map((item, index) => {
          return (
            <SwiperSlide className="rounded-3xl" key={index}>
              {item}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
