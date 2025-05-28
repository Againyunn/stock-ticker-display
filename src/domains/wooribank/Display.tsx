"use client";
import { useRef, useEffect } from "react";
import StockCell from "./components/StockCell";
import { stockDupDummy } from "@/services/dummy/stock";
import "./WooriBankDisplay.css";

export default function WooriBankDisplay() {
  const tickerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const speed = 2; // px per frame
  const animationIds = useRef<number[]>([]);

  useEffect(() => {
    const offsets = [0, 0];

    const animate = (rowIndex: number) => {
      const ticker = tickerRefs[rowIndex].current;
      if (!ticker) return;

      const width = ticker.scrollWidth / 2;

      offsets[rowIndex] -= speed;
      if (Math.abs(offsets[rowIndex]) >= width) {
        offsets[rowIndex] = 0;
      }

      ticker.style.transform = `translateX(${offsets[rowIndex]}px)`;
      animationIds.current[rowIndex] = requestAnimationFrame(() =>
        animate(rowIndex)
      );
    };

    tickerRefs.forEach((_, i) => {
      animationIds.current[i] = requestAnimationFrame(() => animate(i));
    });

    return () => {
      animationIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const sliceSize = stockDupDummy.length * 2;

  return (
    <div className="w-full min-w-[19712px] h-[256px] bg-[#0d1a3b] overflow-hidden px-[60px] py-[42px] text-center relative">
      <div className="flex flex-col gap-[42px]">
        {[0, 1].map((rowIndex) => {
          const slicedData = [...stockDupDummy, ...stockDupDummy].slice(
            rowIndex * 17,
            rowIndex * 17 + sliceSize
          );
          const doubled = [...slicedData, ...slicedData]; // 무한 스크롤용 복제

          return (
            <div
              key={`row-${rowIndex}`}
              ref={tickerRefs[rowIndex]}
              className="flex flex-nowrap items-center gap-[50px] will-change-transform"
              style={{ width: "max-content" }}
            >
              {doubled.map((stock, idx) => (
                <StockCell key={`${rowIndex}-${idx}`} {...stock} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
