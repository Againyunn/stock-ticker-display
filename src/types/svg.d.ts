declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement> & { className?: string }>;
  export default SVG;
}
