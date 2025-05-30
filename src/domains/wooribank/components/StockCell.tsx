import Image from "next/image";

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
        <div className={`text-[#FF3B3B] font-wooridaumB`}>+{percentage}</div>
      );
    } else if (percentageNum < 0) {
      return (
        <div className={`text-[#3A9FF1] font-wooridaumB`}>{percentage}</div>
      );
    } else {
      return <div className={`text-white font-wooridaumB`}>{percentage}</div>;
    }
  };

  return (
    <div
      className={`flex flex-nowrap items-center text-white font-normal whitespace-nowrap px-[12px]`}
      style={{ flex: "0 0 auto" }} // 가변 너비 고정, shrink 안 함
    >
      <div className="flex-shrink-0">
        <Image src={`/icon/${img}`} alt={name + img} width={80} height={60} />
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-normal ml-[50px] min-w-[200px] font-wooridaumL`}
      >
        {name}
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-bold ml-[50px] min-w-[150px] font-wooridaumB`}
      >
        {formattedPrice(price)}
      </div>
      {unit && (
        <div
          className={`flex-shrink-0 text-[25px] font-extralight text-[#929292] ml-[50px] min-w-[100px] font-wooridaumR`}
        >
          ({unit})
        </div>
      )}

      <div
        className={`flex-shrink-0 min-w-[100px] text-[50px] font-bold ml-[50px] font-wooridaumB`}
      >
        {drawFlag(flag)}
      </div>
      <div
        className={`flex-shrink-0 text-[50px] font-bold ml-[50px] mr-[50px] min-w-[150px] font-wooridaumB`}
      >
        {drawPercentage(percentage)}
      </div>
    </div>
  );
}
