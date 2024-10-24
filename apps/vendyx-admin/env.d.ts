declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    VENDYX_ADMIN_BASE_API_URL: string;
  }
}
