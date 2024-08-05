declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    VENDYX_ADMIN_API_URL: string;
  }
}
