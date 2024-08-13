import { useParams } from 'next/navigation';

export const useBase = () => {
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  return `/shops/${shop}`;
};
