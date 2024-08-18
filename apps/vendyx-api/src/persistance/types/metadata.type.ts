/**
 * Structure used to store json values in models likes Shipping handler or Payment integration
 */
export type Metadata = {
  key: string;
  label: string;
  type: 'text' | 'price';
};
