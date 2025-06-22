"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import StockCell, {
  StockCellProps,
} from "@/domains/wooribank/components/TikcerDisplay/StockCell";
import { stockDupDummy1a, stockDupDummy1b } from "@/services/dummy/stock";
import IMMarquee from "@/components/marquee/IMMarquee";
import { domainConfigs } from "@/config/domains";

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 speed와 direction 가져오기 (기본값 설정)
  const speed = Number(searchParams?.get("speed")) || 2;
  const direction = searchParams?.get("direction") || "rtl";
  const isLTR = direction === "ltr";

  // 화면 너비와 배경 설정
  const screenWidth = domainConfigs["wooribank"].layout.width ?? 19584;
  const screenHeight = domainConfigs["wooribank"].layout.height ?? 256;

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

  const { repeated: duplicatedData1a } = useMemo(
    () => getRepeatedData(stockDupDummy1a, false),
    []
  );
  const { repeated: duplicatedData1b } = useMemo(
    () => getRepeatedData(stockDupDummy1b, true),
    []
  );

  const rowData = [duplicatedData1a, duplicatedData1b];

  return (
    <div
      className={`w-full min-w-[${screenWidth}px] h-[${screenHeight}px] overflow-hidden relative flex flex-col p-0`}
    >
      {/* 첫 번째 행 - stockDupDummy1a */}
      <IMMarquee
        className={`flex w-full h-[${screenHeight}px]`}
        speed={speed * 100}
        direction={isLTR ? "right" : "left"}
        height={128}
      >
        <div className="flex flex-nowrap items-center will-change-transform bg-[#192D51] pt-[34px] pb-[24px] min-w-[100vw] max-content-width">
          {rowData[0].map((stock, idx) => (
            <StockCell key={`row1-${idx}`} {...stock} />
          ))}
        </div>
      </IMMarquee>

      {/* 두 번째 행 - stockDupDummy1b */}
      <IMMarquee
        className={`flex w-full h-[${screenHeight}px]`}
        speed={speed * 100}
        direction={isLTR ? "right" : "left"}
        height={128}
      >
        <div className="flex flex-nowrap items-center will-change-transform bg-[#051839] pt-[34px] pb-[24px] min-w-[100vw] max-content-width">
          {rowData[1].map((stock, idx) => {
            // spacer인 경우 빈 div로 렌더링
            if (stock.name === "__SPACER__") {
              return (
                <div
                  key={`row2-spacer-${idx}`}
                  className="w-[465px] shrink-0"
                />
              );
            }
            return <StockCell key={`row2-${idx}`} {...stock} />;
          })}
        </div>
      </IMMarquee>
    </div>
  );
}
