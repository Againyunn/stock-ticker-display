"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { stockDupDummy2 } from "@/services/dummy/stock";
import StockCell2, { StockCell2Props } from "../components/StockCell2";

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();
  const speed = Number(searchParams?.get("speed")) || 2;
  const direction = searchParams?.get("direction") || "rtl"; // rtl: 우->좌, ltr: 좌->우
  const isLTR = direction === "ltr";

  const tickerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const containerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const offsets = useRef<number[]>([0, 0]);
  const widths = useRef<number[]>([0, 0]);
  const animationId = useRef<number>(0);

  const itemPerRow = 34;
  const rowData: [StockCell2Props[], StockCell2Props[]] = useMemo(() => {
    const rows: [StockCell2Props[], StockCell2Props[]] = [[], []];

    // 순차적으로 stockDupDummy2를 2개 row에 분배
    for (let i = 0; i < stockDupDummy2.length; i++) {
      const rowIndex = Math.floor(i / itemPerRow) % 2;
      rows[rowIndex].push(stockDupDummy2[i]);
    }

    return rows;
  }, []);

  useEffect(() => {
    const initializeWidths = () => {
      tickerRefs.forEach((ref, idx) => {
        const ticker = ref.current;
        if (!ticker) return;
        const scrollWidth = ticker.scrollWidth / 2;
        widths.current[idx] = scrollWidth;
        offsets.current[idx] = isLTR ? -scrollWidth : 0;
      });
    };

    const animate = () => {
      tickerRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;

        const width = widths.current[idx];

        if (isLTR) {
          offsets.current[idx] += speed;
          if (offsets.current[idx] >= 0) offsets.current[idx] = -width;
        } else {
          offsets.current[idx] -= speed;
          if (Math.abs(offsets.current[idx]) >= width) offsets.current[idx] = 0;
        }

        el.style.transform = `translate3d(${offsets.current[idx]}px, 0, 0)`;
      });

      animationId.current = requestAnimationFrame(animate);
    };

    initializeWidths();
    animationId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId.current);
  }, [speed, direction]);

  return (
    <div className="w-full min-w-[19712px] h-[256px] bg-[#0d1a3b] overflow-hidden relative flex p-0">
      {/* <div className="flex flex-col h-full"> */}
      {[0, 1].map((rowIndex) => {
        const duplicated = [...rowData[rowIndex], ...rowData[rowIndex]];
        return (
          <div
            key={`row-${rowIndex}`}
            ref={containerRefs[rowIndex]}
            className="w-full"
          >
            <div
              ref={tickerRefs[rowIndex]}
              className="flex flex-nowrap items-center h-[265px] gap-[50px] will-change-transform p"
              style={{
                width: "max-content",
                transform: `translate3d(${isLTR ? "-9999px" : "0px"}, 0, 0)`,
              }}
            >
              {duplicated.map((stock, idx) => (
                <StockCell2 key={`${rowIndex}-${idx}`} {...stock} />
              ))}
            </div>
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
}
