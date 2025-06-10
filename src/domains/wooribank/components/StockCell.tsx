import Image from "next/image";
import { useMemo } from "react";

interface StockCellProps {
  img?: string;
  name: string;
  price: string;
  flag: string;
  percentage: string;
  ghost?: boolean;
}

interface StockCellType extends StockCellProps {
  classes?: string;
}

export default function StockCell({
  img = "",
  name,
  price,
  flag,
  percentage,
  ghost = false,
  classes = "",
}: StockCellType) {
  const formattedPrice = (price: string) => {
    const priceNum = parseFloat(price);
    return priceNum.toLocaleString("en-US");
  };

  const drawFlag = (flag: string) => {
    const flagNum = parseFloat(flag);
    const flagAbs = Math.abs(flagNum);

    if (flagNum > 0) {
      return (
        <div
          className={`flex flex-row flex-nowrap text-[#FF3B3B] font-wooridaumB`}
        >
          ▲ {flagAbs}
        </div>
      );
    } else if (flagNum < 0) {
      return (
        <div
          className={`flex flex-row flex-nowrap text-[#3A9FF1] font-wooridaumB`}
        >
          ▼ {flagAbs}
        </div>
      );
    } else {
      return (
        <div className={`flex flex-row flex-nowrap text-white font-wooridaumB`}>
          - {flagAbs}
        </div>
      );
    }
  };

  const drawPercentage = (percentage: string) => {
    const percentageNum = parseFloat(percentage);

    if (percentageNum > 0) {
      return (
        <div className={`text-[#FF3B3B] font-wooridaumB`}>(+{percentage}%)</div>
      );
    } else if (percentageNum < 0) {
      return (
        <div className={`text-[#3A9FF1] font-wooridaumB`}>({percentage}%)</div>
      );
    } else {
      return (
        <div className={`text-white font-wooridaumB`}>({percentage}%)</div>
      );
    }
  };

  const imageSrc = useMemo(() => {
    if (img === "") {
      return "";
    } else {
      return `/icon/${img}`;
    }
  }, [img]);
  const imageAlt = useMemo(() => name + img, [name, img]);

  if (ghost) {
    return <div className={`w-[465px] ${classes}`} />;
  }

  return (
    <div
      className={`flex flex-nowrap items-center text-white whitespace-nowrap pl-[95px] pr-[105] px-[12px] ${classes}`}
      style={{ flex: "0 0 auto" }} // 가변 너비 고정, shrink 안 함
    >
      {imageSrc && (
        <div className="flex-shrink-0">
          <Image src={imageSrc} alt={imageAlt} width={80} height={60} />
        </div>
      )}
      <div className={`text-[60px] leading-[100%] ml-[25px] font-wooridaumR`}>
        {name}
      </div>
      <div
        className={`text-[70px] leading-[100%] ml-[25px] min-w-[150px] font-wooridaumB`}
      >
        {formattedPrice(price)}
      </div>

      <div
        className={`min-w-[100px] leading-[100%] text-[45px] ml-[25px] font-wooridaumR`}
      >
        {drawFlag(flag)}
      </div>
      <div
        className={`text-[45px] leading-[100%] ml-[50px] ml-[25px] min-w-[150px] font-wooridaumR`}
      >
        {drawPercentage(percentage)}
      </div>
    </div>
  );
}
