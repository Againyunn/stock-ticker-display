import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === "production" ? ".env" : ".env.dev"
    ),
  })
);

// 환경변수 타입 정의
export interface Env {
  NODE_ENV: string;
  LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
  WOORIBANK_DISPLAY: string;
  TICKER_SERVER: string;
  GLOBAL_API: string;
}

// 환경변수 검증 함수
const validateEnv = (): Env => {
  const env: Env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    LOG_LEVEL: (process.env.LOG_LEVEL as Env["LOG_LEVEL"]) || "info",
    // 서버사이드에서는 NEXT_PUBLIC_ 없는 버전 우선, 없으면 NEXT_PUBLIC_ 버전 사용
    WOORIBANK_DISPLAY:
      process.env.WOORIBANK_DISPLAY ||
      process.env.NEXT_PUBLIC_WOORIBANK_DISPLAY ||
      "",
    TICKER_SERVER:
      process.env.TICKER_SERVER || process.env.NEXT_PUBLIC_TICKER_SERVER || "",
    GLOBAL_API:
      process.env.GLOBAL_API || process.env.NEXT_PUBLIC_GLOBAL_API || "",
  };

  return env;
};

const env = validateEnv();

export default env;
