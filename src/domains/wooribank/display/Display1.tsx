"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StockCell, { StockCellProps } from "../components/StockCell";
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
  // const containerRefs = [
  //   useRef<HTMLDivElement>(null),
  //   useRef<HTMLDivElement>(null),
  // ];

  const offsets = useRef<number[]>([0, 0]);
  const widths = useRef<number[]>([0, 0]);
  const animationId = useRef<number>(0);

  // 무한 스크롤을 위해 데이터를 충분히 반복
  const getRepeatedData = (data: StockCellProps[], prependSpacer = false) => {
    const spacer = {
      name: "__SPACER__",
      unit: "",
      price: "",
      flag: "",
      percentage: "",
    };

    const baseData = prependSpacer ? [spacer, ...data] : data;

    // 복제 수를 두 배로 늘려 화면 밖에도 항상 데이터가 존재하게 함
    const minRepeats = Math.max(40, Math.ceil(80 / baseData.length));
    const repeated: StockCellProps[] = [];

    for (let i = 0; i < minRepeats; i++) {
      repeated.push(...baseData);
    }

    return repeated;
  };

  const duplicatedData1a = useMemo(() => getRepeatedData(stockDupDummy1a), []);
  const duplicatedData1b = useMemo(
    () => getRepeatedData(stockDupDummy1b, true),
    []
  );
  const rowData = [duplicatedData1a, duplicatedData1b];

  useEffect(() => {
    const initializeWidths = () => {
      tickerRefs.forEach((ref, idx) => {
        const ticker = ref.current;
        if (!ticker) return;

        const baseLength =
          idx === 1 ? stockDupDummy1b.length + 1 : stockDupDummy1a.length;

        const totalItems = rowData[idx].length;
        const singleItemWidth = ticker.scrollWidth / totalItems;
        const cycleWidth = singleItemWidth * baseLength;

        widths.current[idx] = cycleWidth;
        offsets.current[idx] = isLTR ? -cycleWidth : 0;

        // 초기 위치 설정
        ticker.style.transform = `translate3d(${offsets.current[idx]}px, 0, 0)`;
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
        ref={tickerRefs[0]}
        className="flex flex-nowrap items-center will-change-transform bg-[#192D51] pt-[34px] pb-[24px] min-w-[100vw]"
        style={{
          width: "max-content",
          transform: `translate3d(${offsets.current[0]}px, 0, 0)`,
        }}
      >
        {rowData[0].map((stock, idx) => (
          <StockCell key={`row1-${idx}`} {...stock} />
        ))}
      </div>

      {/* 두 번째 행 - stockDupDummy1b */}
      <div
        ref={tickerRefs[1]}
        className="flex flex-nowrap items-center will-change-transform bg-[#051839] pt-[34px] pb-[24px] min-w-[100vw]"
        style={{
          width: "max-content",
          transform: `translate3d(${offsets.current[1]}px, 0, 0)`,
        }}
      >
        {/* 첫 번째 데이터에만 offset 추가 */}
        <div className="w-[465px] shrink-0" />
        {rowData[1].map((stock, idx) => (
          <StockCell key={`row2-${idx}`} {...stock} />
        ))}
      </div>
    </div>
  );
}
