"use client";
import { useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StockCell, {
  StockCellProps,
} from "../components/TikcerDisplay/StockCell";
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

  const offsets = useRef<number[]>([0, 0]);
  const cycleWidths = useRef<number[]>([0, 0]);
  const animationId = useRef<number>(0);
  const isInitialized = useRef<boolean[]>([false, false]);

  // 무한 스크롤을 위해 데이터를 충분히 반복
  const getRepeatedData = (data: StockCellProps[], addSpacer = false) => {
    const spacer = {
      name: "__SPACER__",
      unit: "",
      price: "",
      flag: "",
      percentage: "",
    };

    const baseData = addSpacer ? [spacer, ...data] : data;
    const repeats = 8; // 충분한 반복을 위해 8번 반복
    const repeated: StockCellProps[] = [];

    for (let i = 0; i < repeats; i++) {
      repeated.push(...baseData);
    }

    return { repeated, baseData };
  };

  const { repeated: duplicatedData1a, baseData: baseData1a } = useMemo(
    () => getRepeatedData(stockDupDummy1a, false),
    []
  );
  const { repeated: duplicatedData1b, baseData: baseData1b } = useMemo(
    () => getRepeatedData(stockDupDummy1b, true),
    []
  );

  const rowData = [duplicatedData1a, duplicatedData1b];
  const baseDataSets = [baseData1a, baseData1b];

  useEffect(() => {
    const measureAndAnimate = () => {
      let allInitialized = true;

      tickerRefs.forEach((ref, idx) => {
        const ticker = ref.current;
        if (!ticker || isInitialized.current[idx]) return;

        const children = ticker.children;
        if (children.length === 0) {
          allInitialized = false;
          return;
        }

        // 첫 번째 사이클의 실제 너비를 정확히 측정
        const baseLength = baseDataSets[idx].length;
        let cycleWidth = 0;

        for (let i = 0; i < baseLength; i++) {
          const child = children[i] as HTMLElement;
          if (child) {
            cycleWidth += child.offsetWidth;
          }
        }

        if (cycleWidth === 0) {
          allInitialized = false;
          return;
        }

        cycleWidths.current[idx] = cycleWidth;
        isInitialized.current[idx] = true;

        // 초기 위치 설정
        if (isLTR) {
          offsets.current[idx] = -cycleWidth;
        } else {
          offsets.current[idx] = 0;
        }

        ticker.style.transform = `translate3d(${offsets.current[idx]}px, 0, 0)`;
      });

      // 모든 행이 초기화되었을 때만 애니메이션 시작
      if (allInitialized && !animationId.current) {
        const animate = () => {
          tickerRefs.forEach((ref, idx) => {
            const el = ref.current;
            if (!el || !isInitialized.current[idx]) return;

            const cycleWidth = cycleWidths.current[idx];

            if (isLTR) {
              offsets.current[idx] += speed;
              if (offsets.current[idx] >= 0) {
                offsets.current[idx] = -cycleWidth;
              }
            } else {
              offsets.current[idx] -= speed;
              if (offsets.current[idx] <= -cycleWidth) {
                offsets.current[idx] = 0;
              }
            }

            el.style.transform = `translate3d(${offsets.current[idx]}px, 0, 0)`;
          });

          animationId.current = requestAnimationFrame(animate);
        };

        animationId.current = requestAnimationFrame(animate);
      } else if (!allInitialized) {
        // 아직 초기화되지 않은 경우 다시 시도
        setTimeout(measureAndAnimate, 50);
      }
    };

    // 초기화 상태 리셋
    isInitialized.current = [false, false];

    // 측정 및 애니메이션 시작
    measureAndAnimate();

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
        animationId.current = 0;
      }
    };
  }, [speed, direction, isLTR]);

  return (
    <div className="w-full min-w-[19584px] h-[256px] overflow-hidden relative flex flex-col p-0">
      {/* 첫 번째 행 - stockDupDummy1a */}
      <div
        ref={tickerRefs[0]}
        className="flex flex-nowrap items-center will-change-transform bg-[#192D51] pt-[34px] pb-[24px] min-w-[100vw] max-content-width"
        // style={{
        //   width: "max-content",
        // }}
      >
        {rowData[0].map((stock, idx) => (
          <StockCell key={`row1-${idx}`} {...stock} />
        ))}
      </div>

      {/* 두 번째 행 - stockDupDummy1b */}
      <div
        ref={tickerRefs[1]}
        className="flex flex-nowrap items-center will-change-transform bg-[#051839] pt-[34px] pb-[24px] min-w-[100vw] max-content-width"
      >
        {rowData[1].map((stock, idx) => {
          // spacer인 경우 빈 div로 렌더링
          if (stock.name === "__SPACER__") {
            return (
              <div key={`row2-spacer-${idx}`} className="w-[465px] shrink-0" />
            );
          }
          return <StockCell key={`row2-${idx}`} {...stock} />;
        })}
      </div>
    </div>
  );
}
