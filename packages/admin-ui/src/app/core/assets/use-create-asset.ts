import { restFetcher } from '@/lib/rest';
import { type VendyxAsset } from '@/lib/vendyx/rest';

export const useCreateAsset = () => {
  const createAsset = async (files: File[]) => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append(`files`, file);
    });

    const response = await restFetcher<VendyxAsset[]>(formData);

    return response;
  };

  return {
    createAsset
  };
};
