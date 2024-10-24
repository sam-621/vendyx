export interface ShipmentHandler {
  /**
   * Method to calculate the price of the shipping method. This method is called when the user is in the checkout process.
   *
   * @warning The price returned should not be formatted should be the raw price.
   */
  calculatePrice(order: any, args: Record<string, string>): Promise<number>;

  /**
   * Method to get the preview price in the admin UI.
   *
   * @description
   * - If returned number is greater than 0, the preview price will be `Price: ${returnedValue}`.
   * - If returned number is 0, the preview price will be `Free`.
   * - If returned number is less than 0, the preview price will be `Dynamic`. (This is used for shipping calculators that get the price from an external service).
   *
   * @warning If any arg is price type it will be received as an integer
   */
  getPricePreview(args: Record<string, string>): number;
}
