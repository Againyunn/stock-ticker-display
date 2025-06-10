import React, { useMemo } from "react";
import Image from "next/image";
import { calculate } from "../utils/calculate";
import IMSparklineUpdownChart from "@/components/chart/IMSparklineUpdownChart";

export interface StockCell2Props {
  img: string;
  name: string;
  price: string;
  flag: string;
  percentage: string;
  data: number[];
}

const StockCell2 = React.memo(function StockCell2({
  img,
  name,
  price,
  flag,
  percentage,
  data,
}: StockCell2Props) {
  // 모든 계산을 미리 메모이제이션
  const formattedPrice = useMemo(
    () => calculate.formattedPrice(price),
    [price]
  );

  const flagUpdown = useMemo(() => {
    const flagNum = parseFloat(flag);
    if (flagNum > 0) {
      return 1;
    } else if (flagNum < 0) {
      return -1;
    } else {
      return 0;
    }
  }, [flag]);

  const flagData = useMemo(() => {
    const flagNum = parseFloat(flag);
    const flagAbs = Math.abs(flagNum);

    if (flagNum > 0) {
      return { symbol: "▲", value: flagAbs, color: "#FF3B3B" };
    } else if (flagNum < 0) {
      return { symbol: "▼", value: flagAbs, color: "#1586EE" };
    } else {
      return { symbol: "-", value: flagAbs, color: "white" };
    }
  }, [flag]);

  const percentageData = useMemo(() => {
    const percentageNum = parseFloat(percentage);

    if (percentageNum > 0) {
      return { text: `+${percentage}%`, color: "#FF3B3B" };
    } else if (percentageNum < 0) {
      return { text: `${percentage}%`, color: "#1586EE" };
    } else {
      return { text: `${percentage}%`, color: "white" };
    }
  }, [percentage]);

  const imageSrc = useMemo(() => {
    if (img === "") {
      return "";
    } else {
      return `/icon/${img}`;
    }
  }, [img]);
  const imageAlt = useMemo(() => name + img, [name, img]);

  return (
    <div
      className="flex flex-nowrap  items-center text-white whitespace-nowrap pl-[70px] pr-[30px] py-[50px] h-[265px]"
      style={{
        // 최적화된 CSS
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeSpeed",
        contain: "layout style",
        isolation: "isolate",
      }}
    >
      <div className="flex flex-col flex-nowrap">
        <div
          className="flex flex-nowrap w-full h-[85px] items-center p-0 mb-[5px]"
          style={{ contain: "layout style" }}
        >
          {imageSrc && (
            <div style={{ width: 120, height: 90, flexShrink: 0 }}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={120}
                height={90}
                priority
                quality={75}
                style={{
                  objectFit: "contain",
                  display: "block",
                }}
                sizes="80px"
              />
            </div>
          )}

          <div
            className="text-[85px] leading-[100%] ml-[30px] min-w-[200px] font-wooridaumR"
            style={{ contain: "layout style" }}
          >
            {name}
          </div>

          <div
            className="text-[85px] leading-[100%] ml-[30px] min-w-[150px] font-wooridaumR"
            style={{ contain: "layout style" }}
          >
            {formattedPrice}
          </div>
        </div>

        <div
          className="flex flex-nowrap justify-end items-end w-full h-[75px]"
          style={{ contain: "layout style" }}
        >
          <div
            className="min-w-[100px] leading-[100%] text-[55px] ml-[50px] font-wooridaumR flex flex-row flex-nowrap"
            style={{
              contain: "layout style",
            }}
          >
            <span
              className="mr-[20px]"
              style={{
                color: flagData.color,
              }}
            >
              {flagData.symbol}
            </span>
            {flagData.value}
          </div>

          <div
            className="text-[55px] leading-[100%] ml-[50px] min-w-[150px] font-wooridaumR"
            style={{
              contain: "layout style",
            }}
          >
            {percentageData.text}
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap ml-[70px] mr-[100px]">
        <IMSparklineUpdownChart
          data={data}
          positiveLineColor="#FF3B3B"
          negativeLineColor="#1586EE"
          positiveAreaColor=""
          negativeAreaColor=""
          centerLineColor=""
          width={300}
          height={116}
          isCurved={false}
          strokeWidth={7}
          forceUpDown={flagUpdown}
        />
      </div>
      <div className="h-[120px] w-[4px] bg-[#ffffff20]"></div>
    </div>
  );
});

export default StockCell2;
