"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { stockDupDummy2 } from "@/services/dummy/stock";
import StockCell6, {
  StockCell6Props,
} from "@/domains/wooribank/components/TikcerDisplay/StockCell6";
import IMMarquee from "@/components/marquee/IMMarquee";
import { domainConfigs } from "@/config/domains";

export default function WooriBankDisplay() {
  const searchParams = useSearchParams();
  const speed = Number(searchParams?.get("speed")) || 2;
  const direction = searchParams?.get("direction") || "rtl"; // rtl: 우->좌, ltr: 좌->우
  const isLTR = direction === "ltr";

  // 화면 너비와 배경 설정
  const screenWidth = domainConfigs["wooribank"].layout.width ?? 19584;
  const screenHeight = domainConfigs["wooribank"].layout.height ?? 256;

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

  return (
    <div
      className={`h-[${screenHeight}px] bg-[#0d1a3b] overflow-hidden relative flex p-0 `}
      style={{
        width: `${screenWidth}px`,
      }}
    >
      <IMMarquee
        className={`relative flex w-[${screenWidth}px] h-[${screenHeight}px]`}
        speed={speed * 100}
        direction={isLTR ? "right" : "left"}
        background={`url('/img/wooribank1.png') repeat-x`}
        backgroundFixed={true}
        height={256}
      >
        {[0, 1].map((rowIndex) => {
          const duplicated = [...rowData[rowIndex], ...rowData[rowIndex]];
          return (
            <div
              key={`row-${rowIndex}`}
              className={`w-[${screenWidth}px] relative`}
            >
              <div
                className={`flex flex-nowrap items-center h-[${screenHeight}px] gap-[50px]`}
              >
                {duplicated.map((stock, idx) => (
                  <StockCell6 key={`${rowIndex}-${idx}`} {...stock} />
                ))}
              </div>
            </div>
          );
        })}
      </IMMarquee>
    </div>
  );
}
