import React, { useMemo } from "react";
import Image from "next/image";
import { calculate } from "../utils/calculate";

interface StockCell2Props {
  img: string;
  name: string;
  price: string;
  flag: string;
  percentage: string;
}

const StockCell2 = React.memo(function StockCell2({
  img,
  name,
  price,
  flag,
  percentage,
}: StockCell2Props) {
  // 모든 계산을 미리 메모이제이션
  const formattedPrice = useMemo(
    () => calculate.formattedPrice(price),
    [price]
  );

  const flagData = useMemo(() => {
    const flagNum = parseFloat(flag);
    const flagAbs = Math.abs(flagNum);

    if (flagNum > 0) {
      return { symbol: "▲", value: flagAbs, color: "#FF3B3B" };
    } else if (flagNum < 0) {
      return { symbol: "▼", value: flagAbs, color: "#3A9FF1" };
    } else {
      return { symbol: "-", value: flagAbs, color: "white" };
    }
  }, [flag]);

  const percentageData = useMemo(() => {
    const percentageNum = parseFloat(percentage);

    if (percentageNum > 0) {
      return { text: `+${percentage}%`, color: "#FF3B3B" };
    } else if (percentageNum < 0) {
      return { text: `${percentage}%`, color: "#3A9FF1" };
    } else {
      return { text: `${percentage}%`, color: "white" };
    }
  }, [percentage]);

  const imageSrc = useMemo(() => `/icon/${img}`, [img]);
  const imageAlt = useMemo(() => name + img, [name, img]);

  return (
    <div
      className="flex flex-nowrap flex-col items-center text-white whitespace-nowrap pl-[107px] pr-[63px] py-[53px]"
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
      <div
        className="flex flex-nowrap w-full h-[75px] items-center p-0"
        style={{ contain: "layout style" }}
      >
        <div style={{ width: 80, height: 60, flexShrink: 0 }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={80}
            height={60}
            priority
            quality={75}
            style={{
              objectFit: "contain",
              display: "block",
            }}
            sizes="80px"
          />
        </div>

        <div
          className="text-[70px] leading-[100%] ml-[30px] min-w-[200px] font-wooridaumR"
          style={{ contain: "layout style" }}
        >
          {name}
        </div>

        <div
          className="text-[75px] leading-[100%] font-bold ml-[30px] min-w-[150px] font-wooridaumB"
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
          className="min-w-[100px] leading-[100%] text-[55px] font-bold ml-[50px] font-wooridaumB flex flex-row flex-nowrap"
          style={{
            color: flagData.color,
            contain: "layout style",
          }}
        >
          {flagData.symbol} {flagData.value}
        </div>

        <div
          className="text-[55px] leading-[100%] font-bold ml-[50px] min-w-[150px] font-wooridaumB"
          style={{
            color: percentageData.color,
            contain: "layout style",
          }}
        >
          {percentageData.text}
        </div>
      </div>
    </div>
  );
});

export default StockCell2;
