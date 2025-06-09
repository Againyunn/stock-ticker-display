"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { stockDupDummy } from "@/services/dummy/stock";
import StockCell2 from "../components/StockCell2";

interface StockCellProps {
  img: string;
  name: string;
  unit: string;
  price: string;
  flag: string;
  percentage: string;
}

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();
  const tickerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const speed = Number(searchParams?.get("speed")) || 2;
  const direction = searchParams?.get("direction") || "rtl"; // rtl: 우->좌, ltr: 좌->우
  const animationIds = useRef<number[]>([]);
  const offsets = useRef<number[]>([0, 0]);

  const isLTR = direction === "ltr";

  // 예시 섹션 구성 (역순: section3 → section2 → section1)
  const sections: StockCellProps[][] = useMemo(() => {
    const perSectionSize = Math.floor(stockDupDummy.length / 3);
    return [
      stockDupDummy.slice(perSectionSize * 2),
      stockDupDummy.slice(perSectionSize, perSectionSize * 2),
      stockDupDummy.slice(0, perSectionSize),
    ];
  }, []);

  // 1행에 들어갈 수 있는 대략적인 아이템 수 (화면 크기에 따라 조정)
  const itemPerRow = 34;
  const rowData: [StockCellProps[], StockCellProps[]] = [[], []];
  let currentRow = 0;

  for (const section of sections) {
    if (rowData[currentRow].length + section.length <= itemPerRow) {
      rowData[currentRow].push(...section);
    } else {
      currentRow = 1;
      rowData[currentRow].push(...section);
    }
  }

  useEffect(() => {
    const initAndAnimate = (rowIndex: number) => {
      const ticker = tickerRefs[rowIndex].current;
      if (!ticker) return;

      const width = ticker.scrollWidth / 2;
      offsets.current[rowIndex] = isLTR ? -width : 0;

      const animate = () => {
        const ticker = tickerRefs[rowIndex].current;
        if (!ticker) return;

        if (isLTR) {
          offsets.current[rowIndex] += speed;
          if (offsets.current[rowIndex] >= 0) {
            offsets.current[rowIndex] = -width;
          }
        } else {
          offsets.current[rowIndex] -= speed;
          if (Math.abs(offsets.current[rowIndex]) >= width) {
            offsets.current[rowIndex] = 0;
          }
        }

        ticker.style.transform = `translateX(${offsets.current[rowIndex]}px)`;
        animationIds.current[rowIndex] = requestAnimationFrame(animate);
      };

      animationIds.current[rowIndex] = requestAnimationFrame(animate);
    };

    tickerRefs.forEach((_, i) => {
      initAndAnimate(i);
    });

    return () => {
      animationIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, [speed, direction]);

  return (
    <div className="w-full min-w-[19712px] h-[256px] bg-[#0d1a3b] overflow-hidden text-center relative">
      <div className="flex flex-col gap-[42px]">
        {[0, 1].map((rowIndex) => {
          const duplicated = [...rowData[rowIndex], ...rowData[rowIndex]];

          return (
            <div
              key={`row-${rowIndex}`}
              ref={tickerRefs[rowIndex]}
              className="flex flex-nowrap items-center gap-[50px] will-change-transform"
              style={{
                width: "max-content",
                transform: isLTR ? `translateX(-9999px)` : `translateX(0px)`,
              }}
            >
              {duplicated.map((stock, idx) => (
                <StockCell2 key={`${rowIndex}-${idx}`} {...stock} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
