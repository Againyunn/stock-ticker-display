import Image from "next/image";
import { calculate } from "../utils/calculate";

interface StockCell2Props {
  img: string;
  name: string;
  price: string;
  flag: string;
  percentage: string;
}

export default function StockCell2({
  img,
  name,
  price,
  flag,
  percentage,
}: StockCell2Props) {
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
        <div className={`text-[#FF3B3B] font-wooridaumB`}>+{percentage}%</div>
      );
    } else if (percentageNum < 0) {
      return (
        <div className={`text-[#3A9FF1] font-wooridaumB`}>{percentage}%</div>
      );
    } else {
      return <div className={`text-white font-wooridaumB`}>{percentage}%</div>;
    }
  };

  return (
    <div
      className={`flex flex-nowrap flex-col items-center text-white whitespace-nowrap pl-[107px] pr-[63px] py-[53px]`}
      //   style={{ flex: "0 0 auto" }} // 가변 너비 고정, shrink 안 함
    >
      <div className="flex flex-nowrap w-full h-[75px] items-center p-0">
        <Image src={`/icon/${img}`} alt={name + img} width={80} height={60} />

        <div className="text-[70px] leading-[100%] ml-[30px] min-w-[200px] font-wooridaumR">
          {name}
        </div>

        <div className="text-[75px] leading-[100%] font-bold ml-[30px] min-w-[150px] font-wooridaumB">
          {calculate.formattedPrice(price)}
        </div>
      </div>
      <div className="flex flex-nowrap justify-end items-end w-full h-[75px]">
        <div
          className={`min-w-[100px] leading-[100%] text-[55px] font-bold ml-[50px] font-wooridaumB`}
        >
          {drawFlag(flag)}
        </div>
        <div
          className={`text-[55px] leading-[100%] font-bold ml-[50px] min-w-[150px] font-wooridaumB`}
        >
          {drawPercentage(percentage)}
        </div>
      </div>
    </div>
  );
}
