import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

interface IMMarqueeProps {
  dataList: string[] | ReactNode[];
  className?: string;
  contentClassName?: string;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  gradient?: boolean;
  gradientWidth?: number;
  gradientColor?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function IMMarquee({
  dataList,
  className,
  contentClassName,
  speed = 100,
  direction = "left",
  gradient = false,
  gradientWidth = 200,
  gradientColor = "white",
  startIcon,
  endIcon,
}: IMMarqueeProps) {
  return (
    <Marquee
      className={`${className || ""}`}
      autoFill
      speed={speed}
      direction={direction}
      gradient={gradient}
      gradientWidth={gradientWidth}
      gradientColor={gradientColor}
    >
      {dataList.map((item, index) => (
        <div
          key={index}
          className={`h-full flex flex-row flex-nowrap items-center text-white mx-[50px] ${
            contentClassName || ""
          }`}
        >
          {startIcon && <div className="mr-[24px]">{startIcon}</div>}
          {item}
          {endIcon && <div className="ml-[24px]">{endIcon}</div>}
        </div>
      ))}
    </Marquee>
  );
}
