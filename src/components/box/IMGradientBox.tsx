import { ReactNode } from "react";

interface IMGradientBoxProps {
  children: ReactNode;
  className?: string;
}

export default function IMGradientBox({
  children,
  className,
  ...props
}: IMGradientBoxProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`background-gradient-box rounded-50 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
