import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

interface IMMarqueeProps {
  dataList?: string[] | ReactNode[];
  className?: string;
  contentClassName?: string;
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  gradient?: boolean;
  gradientWidth?: number;
  gradientColor?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  background?: string;
  backgroundFixed?: boolean;
  height?: number;
  children?: ReactNode;
}

export default function IMMarquee({
  dataList = [],
  className,
  contentClassName,
  speed = 100,
  direction = "left",
  gradient = false,
  gradientWidth = 200,
  gradientColor = "white",
  startIcon,
  endIcon,
  background,
  backgroundFixed = false,
  height,
  children,
}: IMMarqueeProps) {
  return (
    <Marquee
      className={`${className || ""} overflow-hidden relative`}
      autoFill
      speed={speed}
      direction={direction}
      gradient={gradient}
      gradientWidth={gradientWidth}
      gradientColor={gradientColor}
      style={{
        background: backgroundFixed
          ? "transparent"
          : background || "transparent",
        height: height ? `${height}px` : "auto",
      }}
    >
      {backgroundFixed && (
        <div
          className="absolute inset-0 will-change-transform z-0 w-full h-full"
          style={{
            background: background || "transparent",
            backgroundSize: "auto 100%",
          }}
        />
      )}

      {children
        ? children
        : dataList.map((item, index) => (
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
