export interface DomainConfig {
  id: string;
  name: string;
  number?: number; // 전광판 개수가 0개면 -> 개별 페이지 렌더링하는 측에서 예외처리
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
