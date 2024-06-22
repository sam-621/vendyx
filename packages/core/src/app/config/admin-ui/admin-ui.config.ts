export interface AdminUiConfig {
  brand: Partial<BrandConfig>;
  /**
   * The path where admin-ui is served.
   * @default '/admin'
   */
  serveUrl: string;
}

interface BrandConfig {
  /**
   * Name of the brand.
   *
   * @description
   * This name will be displayed in the admin UI in the places where the EBloc name is displayed, for example in the sidebar.
   *
   * @default 'Ebloc'
   */
  name: string;
  /**
   * Description of the brand.
   *
   * @description
   * This description will be displayed in the admin UI in the places where the EBloc description is displayed, for example in the meta description.
   *
   * @default "A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement.""
   */
  description: string;
  /**
   * URL of the brand logo.
   *
   * @description
   * This logo will be displayed in the admin UI in the places where the EBloc logo is displayed, for example in the sidebar.
   */
  logoUrl: string;
}
