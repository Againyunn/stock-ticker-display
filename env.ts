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
  GLOBAL_API: string;
}

// 환경변수 검증 함수
const validateEnv = (): Env => {
  const requiredEnvs = ["NODE_ENV"] as const;

  // 필수 환경변수 체크
  for (const key of requiredEnvs) {
    if (!process.env[key]) {
      console.error(`❌ Missing required environment variable: ${key}`);
      process.exit(1);
    }
  }

  // URL 형식 검증이 필요한 환경변수들
  const urlEnvs = ["MONGODB_URI_W12", "GLOBAL_API"];
  for (const key of urlEnvs) {
    const value = process.env[key];
    if (value) {
      try {
        new URL(value);
      } catch {
        console.error(`❌ Invalid URL format for ${key}: ${value}`);
        process.exit(1);
      }
    }
  }

  const env: Env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    LOG_LEVEL: (process.env.LOG_LEVEL as Env["LOG_LEVEL"]) || "info",
    WOORIBANK_DISPLAY: process.env.WOORIBANK_DISPLAY || "",
    GLOBAL_API: process.env.GLOBAL_API || "",
  };

  return env;
};

const env = validateEnv();

export default env;
