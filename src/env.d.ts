declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      FRONTEND_URL: string;
      POSTGRES_DATABASE_URL: string;
      REDIS_URL: string;
    }
  }
}

export {}
