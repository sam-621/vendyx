export interface VendyxConfig {
  app: {
    port: number;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
  };
  db: {
    url: string;
  };
  assets: {
    storageProvider: StorageProvider;
  };
}

export interface StorageProvider {
  /**
   * The provider name. This is used to display the provider name to the user.
   *
   * @description
   * The name is not arbitrary, it's up to you to choose a name that makes sense for your provider.
   *
   * @example
   * ```ts
   * name: 'Google Cloud Storage'
   * ```
   */
  name: string;

  /**
   * The provider code. This is used to identify the provider and should be unique.
   *
   * @description
   * The name is not arbitrary, it's up to you to choose a name that makes sense for your provider.
   *
   * @example
   * ```ts
   * code: 'google-cloud-storage'
   * ```
   */
  code: string;

  upload(file: string): Promise<string | null>;
}
