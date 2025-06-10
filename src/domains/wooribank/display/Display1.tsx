"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StockCell from "../components/StockCell";
import { stockDupDummy1a, stockDupDummy1b } from "@/services/dummy/stock";

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 speed와 direction 가져오기 (기본값 설정)
  const speed = Number(searchParams?.get("speed")) || 2; // 기본값을 Display2와 동일하게 2로 설정
  const direction = searchParams?.get("direction") || "rtl"; // 기본 rtl (우->좌)
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

  // 무한 스크롤을 위해 데이터를 충분히 반복
  const getRepeatedData = (
    data: Array<{
      img?: string;
      name: string;
      unit: string;
      price: string;
      flag: string;
      percentage: string;
    }>
  ) => {
    // 최소 반복 횟수를 계산 (화면을 충분히 채우기 위해)
    const minRepeats = Math.max(20, Math.ceil(40 / data.length)); // 최소 20번 또는 40개 항목이 되도록
    const repeated = [];

    for (let i = 0; i < minRepeats; i++) {
      repeated.push(...data);
    }

    return repeated;
  };

  const duplicatedData1a = useMemo(() => {
    return getRepeatedData(stockDupDummy1a);
  }, []);

  const duplicatedData1b = useMemo(() => {
    return getRepeatedData(stockDupDummy1b);
  }, []);

  const rowData = [duplicatedData1a, duplicatedData1b];

  useEffect(() => {
    const initializeWidths = () => {
      tickerRefs.forEach((ref, idx) => {
        const ticker = ref.current;
        if (!ticker) return;

        // 실제 데이터의 반복 단위 길이 계산
        const originalDataLength =
          idx === 0 ? stockDupDummy1a.length : stockDupDummy1b.length;
        const singleItemWidth = ticker.scrollWidth / rowData[idx].length;
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

    initializeWidths();
    animationId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId.current);
  }, [speed, direction, isLTR]);

  return (
    <div className="w-full min-w-[19712px] h-[256px] overflow-hidden relative flex flex-col p-0">
      {/* 첫 번째 행 - stockDupDummy1a */}
      <div
        ref={containerRefs[0]}
        className="h-[128px] flex items-center overflow-hidden relative bg-[#192D51]"
      >
        <div
          ref={tickerRefs[0]}
          className="flex flex-nowrap items-center will-change-transform"
          style={{
            width: "max-content",
            transform: `translate3d(${isLTR ? "-9999px" : "0px"}, 0, 0)`,
          }}
        >
          {rowData[0].map((stock, idx) => (
            <StockCell key={`row1-${idx}`} {...stock} />
          ))}
        </div>
      </div>

      {/* 두 번째 행 - stockDupDummy1b */}
      <div
        ref={containerRefs[1]}
        className="h-[128px] flex items-center overflow-hidden relative bg-[#051839]"
      >
        <div
          ref={tickerRefs[1]}
          className="flex flex-nowrap items-center will-change-transform"
          style={{
            width: "max-content",
            transform: `translate3d(${isLTR ? "-9999px" : "0px"}, 0, 0)`,
          }}
        >
          {rowData[1].map((stock, idx) => (
            <StockCell
              key={`row2-${idx}`}
              classes={idx === 0 ? "pl-[465px]" : ""}
              {...stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
