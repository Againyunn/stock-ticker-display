export enum ChartTickType {
  M001 = "M001",
  M010 = "M010",
  M030 = "M030",
  D001 = "D001",
  // TODO : 새로운 봉 타입 필요 시 추가
}

export interface ChartReq {
  code: string;
  count: number;
  type: ChartTickType;
  startDate?: string;
  endDate?: string;
}

export interface ChartItem {
  date: string;
  time: string; // yyyymmddhhmmsss
  stdate: number;
  endate: number;
  open: number;
  high: number;
  low: number;
  close: number;
  diffsign: number;
  diff: number;
  vol: number;
  amt: number;
}

export interface ChartRes {
  success: boolean;
  data: ChartItem[];
}
