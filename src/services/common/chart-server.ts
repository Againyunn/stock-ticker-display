import env from "@/env";
import { ChartReq, ChartRes } from "@/types/chart";

/**
 * 차트 데이터 조회
 * @param req
 * @returns 차트 데이터
 */
const getChartData = async (req: ChartReq): Promise<ChartRes> => {
  const url = `${env.GLOBAL_API}/common/chart-data`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(req),
  });
  const data: ChartRes = await response.json();

  if (!data.success) {
    return {
      success: false,
      data: [],
    };
  }

  return data;
};

export { getChartData };
