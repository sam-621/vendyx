import { useParams } from 'next/navigation';

/**
 * Returns the base path for the current shop.
 *
 * @returns "/shops/:shop"
 */
export const useBase = () => {
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  return `/shops/${shop}`;
};
