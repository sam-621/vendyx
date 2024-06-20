/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_ADMIN_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
