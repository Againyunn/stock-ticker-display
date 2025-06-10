import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface IMSparklineUpdownChartProps {
  positiveLineColor: string;
  negativeLineColor: string;
  positiveAreaColor: string;
  negativeAreaColor: string;
  centerLineColor: string;

  // 값 제어
  data: (number | null)[];
  centerLineValue?: number;
  forceUpDown?: number; // -1 : 하락, 0 : 값에 따라(기본 값), 1 : 상승

  // 모양 결정
  isCurved?: boolean;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

const IMSparklineUpdownChart: React.FC<IMSparklineUpdownChartProps> = ({
  data = [],
  width = 300,
  height = 30,
  positiveAreaColor,
  negativeAreaColor,
  positiveLineColor,
  negativeLineColor,
  centerLineColor,
  centerLineValue = 0,
  isCurved = true,
  strokeWidth = 2,
  forceUpDown = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.html("");

    const margin = {
      top: 2 + strokeWidth,
      right: 5,
      bottom: 2 + strokeWidth,
      left: 5,
    };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    // SVG에 전체 그룹 생성 및 margin 적용
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const validData = data
      .map((d, i) => (d !== null ? { value: d, index: i } : null))
      .filter(Boolean) as { value: number; index: number }[];

    // 유효한 데이터가 있을 때만 min/max 계산
    const minValue =
      validData.length > 0
        ? Math.min(...validData.map((d) => d.value))
        : centerLineValue - 1;

    const maxValue =
      validData.length > 0
        ? Math.max(...validData.map((d) => d.value))
        : centerLineValue + 1;

    const renderDefaultBorderLine = () => {
      const centerY = d3
        .scaleLinear()
        .domain([minValue, maxValue])
        .range([h, 0])(centerLineValue);

      g.append("line")
        .attr("x1", 0)
        .attr("y1", centerY)
        .attr("x2", w)
        .attr("y2", centerY);

      if (centerLineColor !== "") {
        g.attr("stroke", centerLineColor).attr("stroke-dasharray", "6 4");
      }
    };

    if (validData.length === 0) {
      renderDefaultBorderLine();
      return;
    }

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([minValue, maxValue]).range([h, 0]);
    const zeroY = yScale(centerLineValue);

    const generateSegments = () => {
      const segments: { points: [number, number][]; type: string }[] = [];
      let currentSegment: [number, number][] = [];
      let prevType =
        validData[0]?.value >= centerLineValue ? "positive" : "negative";

      validData.forEach(({ value, index }, i) => {
        const x = xScale(index);
        const y = yScale(value);
        const type = value >= centerLineValue ? "positive" : "negative";

        if (type !== prevType) {
          const prevValue = validData[i - 1]?.value;
          if (prevValue !== undefined) {
            const ratio =
              Math.abs(prevValue - centerLineValue) /
              (Math.abs(prevValue - centerLineValue) +
                Math.abs(value - centerLineValue));
            const interpolatedX = xScale(index - 1 + ratio);
            currentSegment.push([interpolatedX, zeroY]);
          }

          segments.push({ points: [...currentSegment], type: prevType });
          currentSegment = [[x, zeroY]];
        }

        currentSegment.push([x, y]);
        prevType = type;
      });

      if (currentSegment.length) {
        segments.push({ points: currentSegment, type: prevType });
      }

      return segments;
    };

    const renderSegments = (
      segments: { points: [number, number][]; type: string }[]
    ) => {
      const areaGenerator = d3
        .area<[number, number]>()
        .x((d) => d[0])
        .y0(zeroY)
        .y1((d) => d[1])
        .curve(isCurved ? d3.curveMonotoneX : d3.curveLinear);
      const lineGenerator = d3
        .line<[number, number]>()
        .x((d) => d[0])
        .y((d) => d[1])
        .curve(isCurved ? d3.curveMonotoneX : d3.curveLinear);

      segments.forEach(({ points, type }) => {
        if (forceUpDown > 0) {
          type = "positive";
        } else if (forceUpDown < 0) {
          type = "negative";
        }

        const fillColor =
          type === "positive" ? positiveAreaColor : negativeAreaColor;
        const strokeColor =
          type === "positive" ? positiveLineColor : negativeLineColor;

        console.log(fillColor, strokeColor);

        if (fillColor !== "") {
          g.append("path")
            .datum(points)
            .attr("fill", fillColor)
            .attr("d", areaGenerator);
        }

        g.append("path")
          .datum(points)
          .attr("fill", "none")
          .attr("stroke", strokeColor)
          .attr("stroke-width", strokeWidth)
          .attr("d", lineGenerator);
      });
    };

    const renderChart = () => {
      const segments = generateSegments();
      renderSegments(segments);

      /** 경계 라인 Y 좌표를 구하는 함수
       *
       * @returns
       */
      const getY = () => {
        // yScale(centerLineValue)를 기준으로 height 안에 있을 경우 그대로 그린다
        if (zeroY <= height && zeroY >= 0) {
          return zeroY;
        }

        // min 값이 centerLineValue보다 클 경우 height를 기준으로 그린다
        if (minValue > centerLineValue) {
          return height;
        } else if (maxValue < centerLineValue) {
          // max 값이 centerLineValue보다 작을 경우 height를 기준으로 그린다
          return 0;
        }

        return zeroY;
      };

      const yPos = getY();

      g.append("line")
        .attr("x1", 0)
        .attr("y1", yPos)
        .attr("x2", w)
        .attr("y2", yPos)
        .attr("stroke", centerLineColor)
        .attr("stroke-dasharray", "6 4");
    };

    renderChart();
  }, [data, width, height, centerLineValue, isCurved]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default IMSparklineUpdownChart;
