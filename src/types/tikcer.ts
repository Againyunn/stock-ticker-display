export interface TickerItem {
  DATE: string;
  TRTIME: string;
  OPEN: string;
  HIGH: string;
  LOW: string;
  CLOSE: string;
  DIFFSIGN: string;
  DIFF: string;
  DIFFRATE: string;
  VOL: string;
  TOTALVOL: string;
  AMT: string;
  TOTALAMT: string;
  BID: string;
  ASK: string;
  ETC1: string;
  ETC2: string;
  QTYP: string;
}

export interface TickerRes {
  code: string;
  OutBlock: TickerItem[];
}
