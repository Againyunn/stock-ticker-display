// 클라이언트 사이드 환경변수 타입 정의
export interface ClientEnv {
  WOORIBANK_DISPLAY: string;
  TICKER_SERVER: string;
  GLOBAL_API: string;
}

// 클라이언트 사이드 환경변수 검증 및 로드
const validateClientEnv = (): ClientEnv => {
  const env: ClientEnv = {
    WOORIBANK_DISPLAY: process.env.NEXT_PUBLIC_WOORIBANK_DISPLAY || "",
    TICKER_SERVER: process.env.NEXT_PUBLIC_TICKER_SERVER || "",
    GLOBAL_API: process.env.NEXT_PUBLIC_GLOBAL_API || "",
  };

  return env;
};

const clientEnv = validateClientEnv();

export default clientEnv;
