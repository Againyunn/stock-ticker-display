"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StockCell from "../components/StockCell";
import { stockDupDummy1a, stockDupDummy1b } from "@/services/dummy/stock";

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 speed와 direction 가져오기 (기본값 설정)
  const speed = Number(searchParams?.get("speed")) || 2;
  const direction = searchParams?.get("direction") || "rtl";
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

  // 원본 데이터 배열 정의
  const originalData = [stockDupDummy1a, stockDupDummy1b];

  // 무한 스크롤을 위해 데이터를 충분히 반복하되 최적화된 방식으로
  const rowData = useMemo(() => {
    return originalData.map((data) => {
      // 최소 반복 횟수를 계산 (화면을 충분히 채우기 위해)
      const minRepeats = Math.max(20, Math.ceil(40 / data.length));
      const repeated = [];

      for (let i = 0; i < minRepeats; i++) {
        repeated.push(...data);
      }

      return repeated;
    });
  }, []);

  useEffect(() => {
    const initializeWidths = () => {
      tickerRefs.forEach((ref, idx) => {
        const ticker = ref.current;
        if (!ticker) return;

        // Display2 방식을 참고한 width 계산 최적화
        const originalDataLength = originalData[idx].length;
        const totalItems = rowData[idx].length;
        const singleItemWidth = ticker.scrollWidth / totalItems;
        const singleCycleWidth = singleItemWidth * originalDataLength;

        widths.current[idx] = singleCycleWidth;
        offsets.current[idx] = isLTR ? -singleCycleWidth : 0;
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

    // Display2 방식을 참고한 초기화 순서 최적화
    const timeoutId = setTimeout(() => {
      initializeWidths();
      animationId.current = requestAnimationFrame(animate);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId.current);
    };
  }, [speed, direction, isLTR, rowData]);

  return (
    <div className="w-full min-w-[19712px] h-[256px] overflow-hidden relative flex flex-col p-0">
      {/* Display2 방식을 참고한 컴포넌트 구조 최적화 */}
      {[0, 1].map((rowIndex) => {
        const bgColor = rowIndex === 0 ? "bg-[#192D51]" : "bg-[#051839]";

        return (
          <div
            key={`row-${rowIndex}`}
            ref={containerRefs[rowIndex]}
            className={`h-[128px] flex items-center overflow-hidden relative ${bgColor}`}
          >
            <div
              ref={tickerRefs[rowIndex]}
              className="flex flex-nowrap items-center will-change-transform"
              style={{
                width: "max-content",
                transform: `translate3d(${isLTR ? "-9999px" : "0px"}, 0, 0)`,
              }}
            >
              {rowData[rowIndex].map((stock, idx) => (
                <StockCell
                  key={`row${rowIndex + 1}-${idx}`}
                  classes={rowIndex === 1 && idx === 0 ? "pl-[465px]" : ""}
                  {...stock}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
