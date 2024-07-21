declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    DB_URL: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    PAYPAL_CLIENT_ID: string;
    PAYPAL_SECRET: string;
    PAYPAL_SANDOX_MODE: boolean;
  }
}
