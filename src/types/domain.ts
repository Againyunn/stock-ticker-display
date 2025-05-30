export interface DomainConfig {
  id: string;
  name: string;
  iconUrl: string;
  component: string;
  dataSource: {
    type: "api" | "static";
    endpoint?: string;
    refreshInterval?: number;
  };
  layout: {
    theme: "light" | "dark";
    columns: number;
    rows: number;
    width: number;
    height: number;
  };
}
