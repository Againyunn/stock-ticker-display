"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { stockDupDummy2 } from "@/services/dummy/stock";
import StockCell6, {
  StockCell6Props,
} from "../components/TikcerDisplay/StockCell6";

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
  const backgroundRef = useRef<HTMLDivElement>(null);

  const offsets = useRef<number[]>([0, 0]);
  const widths = useRef<number[]>([0, 0]);
  const backgroundOffset = useRef<number>(0);
  const animationId = useRef<number>(0);

  // 화면 너비와 배경 설정
  const screenWidth = 19712;
  const backgroundWidth = screenWidth * 2; // 화면 너비의 2배로 설정

  const itemPerRow = 34;
  const rowData: [StockCell6Props[], StockCell6Props[]] = useMemo(() => {
    const rows: [StockCell6Props[], StockCell6Props[]] = [[], []];

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
      // 배경 초기 위치 설정 - 화면 너비에 맞춰 조정
      backgroundOffset.current = isLTR ? -backgroundWidth / 2 : 0;
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

      // 배경 애니메이션 - 화면을 완전히 벗어날 때까지 리셋하지 않음
      const backgroundEl = backgroundRef.current;
      if (backgroundEl) {
        if (isLTR) {
          backgroundOffset.current += speed;
          // 배경이 화면을 완전히 벗어나면 리셋
          if (backgroundOffset.current >= screenWidth) {
            backgroundOffset.current = -backgroundWidth / 2;
          }
        } else {
          backgroundOffset.current -= speed;
          // 배경이 화면을 완전히 벗어나면 리셋
          if (
            Math.abs(backgroundOffset.current) >=
            screenWidth + backgroundWidth / 2
          ) {
            backgroundOffset.current = 0;
          }
        }

        backgroundEl.style.transform = `translate3d(${backgroundOffset.current}px, 0, 0)`;
      }

      animationId.current = requestAnimationFrame(animate);
    };

    initializeWidths();
    animationId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId.current);
  }, [speed, direction, backgroundWidth, screenWidth]);

  return (
    <div className="w-full min-w-[19584px] h-[256px] bg-[#0d1a3b] overflow-hidden relative flex p-0">
      {/* 움직이는 배경 레이어 */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 will-change-transform z-0"
        style={{
          background: `url('/img/wooribank1.png') repeat-x`,
          backgroundSize: "auto 100%",
          width: `${backgroundWidth}px`, // 화면 너비의 2배
          transform: `translate3d(${
            isLTR ? `-${backgroundWidth / 2}px` : "0px"
          }, 0, 0)`,
        }}
      />

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex w-full">
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
                  width: "2100px",
                  transform: `translate3d(${isLTR ? "-9999px" : "0px"}, 0, 0)`,
                }}
              >
                {duplicated.map((stock, idx) => (
                  <StockCell6
                    key={`${rowIndex}-${idx}`}
                    isEven={idx % 2 === 0}
                    {...stock}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
