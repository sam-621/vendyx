import { getShopId, getToken } from '@/lib/shared/cookies';

const upload = async (formData: FormData) => {
  const response = await fetch(`${process.env.VENDYX_ADMIN_BASE_API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      shop_id: getShopId() ?? ''
    },
    body: formData
  });

  const data = (await response.json()) as Omit<VendyxAsset, 'order'>[];

  return data;
};

export const AssetService = {
  upload
};

export type VendyxAsset = {
  id: string;
  name: string;
  source: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  type: 'IMAGE';
};
