import Image from "next/image";
import { Roboto } from "next/font/google";

const robotoBold = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const robotoRegular = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface StockCellProps {
  img: string;
  name: string;
  unit: string;
  price: string;
  flag: string;
  percentage: string;
}

export default function StockCell({
  img,
  name,
  unit,
  price,
  flag,
  percentage,
}: StockCellProps) {
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
          className={`flex flex-row flex-nowrap text-[#FF3B3B] ${robotoBold.className}`}
        >
          ▲ {flagAbs}
        </div>
      );
    } else if (flagNum < 0) {
      return (
        <div
          className={`flex flex-row flex-nowrap text-[#3A9FF1] ${robotoBold.className}`}
        >
          ▼ {flagAbs}
        </div>
      );
    } else {
      return (
        <div
          className={`flex flex-row flex-nowrap text-white ${robotoBold.className}`}
        >
          - {flagAbs}
        </div>
      );
    }
  };

  const drawPercentage = (percentage: string) => {
    const percentageNum = parseFloat(percentage);

    if (percentageNum > 0) {
      return (
        <div className={`text-[#FF3B3B] ${robotoBold.className}`}>
          +{percentage}
        </div>
      );
    } else if (percentageNum < 0) {
      return (
        <div className={`text-[#3A9FF1] ${robotoBold.className}`}>
          {percentage}
        </div>
      );
    } else {
      return (
        <div className={`text-white ${robotoBold.className}`}>{percentage}</div>
      );
    }
  };

  return (
    <div
      className={`flex flex-nowrap items-center text-white font-normal whitespace-nowrap px-[12px] ${robotoRegular.className}`}
      style={{ flex: "0 0 auto" }} // 가변 너비 고정, shrink 안 함
    >
      <div className="flex-shrink-0">
        <Image src={`/icon/${img}`} alt={name + img} width={80} height={60} />
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-normal ml-[50px] min-w-[200px] ${robotoRegular.className}`}
      >
        {name}
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-bold ml-[50px] min-w-[150px] ${robotoBold.className}`}
      >
        {formattedPrice(price)}
      </div>
      {unit && (
        <div
          className={`flex-shrink-0 text-[25px] font-extralight text-[#929292] ml-[50px] min-w-[100px] ${robotoRegular.className}`}
        >
          ({unit})
        </div>
      )}

      <div
        className={`flex-shrink-0 min-w-[100px] text-[50px] font-bold ml-[50px] ${robotoBold.className}`}
      >
        {drawFlag(flag)}
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-bold ml-[50px] mr-[50px] min-w-[150px] ${robotoBold.className}`}
      >
        {drawPercentage(percentage)}
      </div>
    </div>
  );
}
