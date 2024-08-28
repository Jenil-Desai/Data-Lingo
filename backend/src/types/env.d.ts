declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    DATABASE_URL: string;
    PORT: number;
    GEMINI_API_KEY: string;
  }
}
