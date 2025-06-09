import { DomainConfig } from "@/types/domain";

export const domainConfigs: Record<string, DomainConfig> = {
  wooribank: {
    id: "wooribank",
    name: "우리은행",
    number: 5,
    iconUrl: "/icon/woori.svg",
    component: "WooribankDisplay",
    dataSource: {
      type: "api",
      endpoint: "/api/wooribank/stock",
      refreshInterval: 5000,
    },
    layout: {
      theme: "light",
      columns: 2,
      rows: 1,
      width: 19172,
      height: 256,
    },
  },
};
