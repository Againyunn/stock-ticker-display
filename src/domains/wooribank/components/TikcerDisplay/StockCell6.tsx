import React, { useMemo } from "react";
import Image from "next/image";
import { calculate } from "../../utils/calculate";
import IMSparklineUpdownChart from "@/components/chart/IMSparklineUpdownChart";
import { theme } from "../../utils/theme";

export interface StockCell6Props {
  img: string;
  name: string;
  price: string;
  flag: string;
  percentage: string;
  data: number[];
  isEven?: boolean;
}

const StockCell6 = React.memo(function StockCell6({
  img,
  name,
  price,
  flag,
  percentage,
  data,
  isEven = false,
}: StockCell6Props) {
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
      return { symbol: "▲", value: flagAbs, color: theme.flag.upColor };
    } else if (flagNum < 0) {
      return { symbol: "▼", value: flagAbs, color: theme.flag.downColor };
    } else {
      return { symbol: "-", value: flagAbs, color: "white" };
    }
  }, [flag]);

  const percentageData = useMemo(() => {
    const percentageNum = parseFloat(percentage);

    if (percentageNum > 0) {
      return { text: `+${percentage}%`, color: theme.flag.upColor };
    } else if (percentageNum < 0) {
      return { text: `${percentage}%`, color: theme.percentage.downColor };
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
      className="relative flex flex-nowrap  items-center text-white whitespace-nowrap pl-[70px] pr-[30px] pt-[47px] pb-[97px] h-[265px]"
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
        className="flex flex-nowrap w-full h-[85px] items-center p-0 mb-[5px]"
        style={{ contain: "layout style" }}
      >
        {imageSrc && (
          <div style={{ width: 120, height: 90, flexShrink: 0 }}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={150}
              height={112}
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
          className="text-[80px] leading-[100%] ml-[80px] min-w-[200px] font-wooridaumR"
          style={{ contain: "layout style" }}
        >
          {name}
        </div>

        <div
          className="text-[100px] leading-[100%] ml-[80px] min-w-[150px] font-wooridaumR"
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
          className={`min-w-[100px] ml-[80px] font-wooridaumR flex flex-row flex-nowrap`}
          style={{
            contain: "layout style",
            color: flagData.color,
          }}
        >
          <span
            className="mr-[20px] text-[57px] leading-[140%]"
            style={{
              color: flagData.color,
            }}
          >
            {flagData.symbol}
          </span>
          <span className="text-[90px] leading-[100%]">{flagData.value}</span>
        </div>

        <div
          className="text-[90px] leading-[100%] ml-[30px] min-w-[150px] font-wooridaumR"
          style={{
            contain: "layout style",
            color: percentageData.color,
          }}
        >
          ({percentageData.text})
        </div>
      </div>
      <div className="flex flex-row flex-nowrap ml-[70px] mr-[100px]">
        <IMSparklineUpdownChart
          data={data}
          positiveLineColor={theme.flag.upColor}
          negativeLineColor={theme.flag.downColor}
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

      <div className="block h-[120px] min-w-[4px] bg-[#ffffff40]"></div>

      {/* <Image
        src="/icon/wooribank_ci.svg"
        alt="Woori Bank CI"
        width={120}
        height={60}
        priority
        quality={75}
        style={{
          objectFit: "contain",
          display: "block",
          position: "absolute",
          bottom: 20,
          right: -110,
          zIndex: 100,
          width: "300px",
          height: "60px",
        }}
      /> */}
      <div
        style={{
          objectFit: "contain",
          display: "block",
          position: "absolute",
          bottom: 20,
          right: -110,
          zIndex: 100,
          width: "300px",
          height: "60px",
        }}
      >
        <div className="flex flex-row flex-nowrap items-center justify-center">
          <Image
            src="/icon/woori.svg"
            alt="Woori Bank CI"
            width={50}
            height={50}
            priority
            quality={75}
          />
          <span className="text-[34px] leading-[100%] ml-[5px]">
            {isEven ? "우리금융그룹" : "우리은행"}
          </span>
        </div>
      </div>
    </div>
  );
});

export default StockCell6;
