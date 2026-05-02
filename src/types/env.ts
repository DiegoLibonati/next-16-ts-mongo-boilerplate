import type { Env } from "@/types/cross";

export interface Envs {
  PORT: number;
  ENV: Env;
  JWT_SECRET: string;
  DATABASE_URL: string;
}
