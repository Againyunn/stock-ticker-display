"use client";
import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StockCell from "../components/StockCell";
import { stockDupDummy1a, stockDupDummy1b } from "@/services/dummy/stock";

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
  const rowWidths = useRef<number[]>([0, 0]);

  const isLTR = direction === "ltr";

  // 1행: stockDupDummy1a를 3배로, 2행: stockDupDummy1b를 3배로 (img가 없는 경우 빈 문자열로 처리)
  const rowData: [StockCellProps[], StockCellProps[]] = [
    [
      ...stockDupDummy1a.map((stock) => ({ ...stock, img: stock.img || "" })),
      ...stockDupDummy1a.map((stock) => ({ ...stock, img: stock.img || "" })),
      ...stockDupDummy1a.map((stock) => ({ ...stock, img: stock.img || "" })),
    ],
    [
      ...stockDupDummy1b.map((stock) => ({ ...stock, img: stock.img || "" })),
      ...stockDupDummy1b.map((stock) => ({ ...stock, img: stock.img || "" })),
      ...stockDupDummy1b.map((stock) => ({ ...stock, img: stock.img || "" })),
    ],
  ];

  useEffect(() => {
    const initAndAnimate = (rowIndex: number) => {
      const ticker = tickerRefs[rowIndex].current;
      if (!ticker) return;

      // 각 행의 실제 너비를 개별적으로 계산 (3배로 복사된 데이터의 1/3)
      const fullWidth = ticker.scrollWidth;
      const singleSetWidth = fullWidth / 3;
      rowWidths.current[rowIndex] = singleSetWidth;

      // 각 행별로 초기 위치 설정
      if (isLTR) {
        offsets.current[rowIndex] = -singleSetWidth;
      } else {
        offsets.current[rowIndex] = 0;
      }

      const animate = () => {
        const ticker = tickerRefs[rowIndex].current;
        if (!ticker) return;

        const singleSetWidth = rowWidths.current[rowIndex];

        if (isLTR) {
          offsets.current[rowIndex] += speed;
          // 한 세트만큼 이동했으면 다시 처음으로
          if (offsets.current[rowIndex] >= 0) {
            offsets.current[rowIndex] = -singleSetWidth;
          }
        } else {
          offsets.current[rowIndex] -= speed;
          // 한 세트만큼 이동했으면 다시 처음으로
          if (Math.abs(offsets.current[rowIndex]) >= singleSetWidth) {
            offsets.current[rowIndex] = 0;
          }
        }

        ticker.style.transform = `translateX(${offsets.current[rowIndex]}px)`;
        animationIds.current[rowIndex] = requestAnimationFrame(animate);
      };

      animationIds.current[rowIndex] = requestAnimationFrame(animate);
    };

    // 각 행에 대해 독립적으로 애니메이션 초기화
    tickerRefs.forEach((_, i) => {
      initAndAnimate(i);
    });

    return () => {
      animationIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, [speed, direction]);

  return (
    <div className="w-full min-w-[19712px] h-[256px] flex flex-col overflow-hidden text-center relative p-0">
      {[0, 1].map((rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          ref={tickerRefs[rowIndex]}
          className="flex flex-nowrap items-center gap-[50px] will-change-transform pt-[34px] pb-[24px] h-[128px]"
          style={{
            width: "max-content",
            transform: isLTR ? `translateX(-9999px)` : `translateX(0px)`,
            backgroundColor: rowIndex === 0 ? "#192D51" : "#051839",
          }}
        >
          {rowData[rowIndex].map((stock, idx) => (
            <StockCell
              key={`${rowIndex}-${idx}`}
              classes={rowIndex === 1 && idx === 0 ? "pl-[465px]" : ""}
              {...stock}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
