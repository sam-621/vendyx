import { serviceRestFetcher } from './service-fetchers';

const upload = async (formData: FormData) => {
  const assets = await serviceRestFetcher<Omit<VendyxAsset, 'order'>[]>('/upload', {
    method: 'POST',
    body: formData
  });

  return assets;
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
