import { restFetcher } from '@/lib/rest';
import { type EblocAsset } from '@/lib/ebloc/rest';

export const useCreateAsset = () => {
  const createAsset = async (files: File[]) => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append(`files`, file);
    });

    const response = await restFetcher<EblocAsset[]>(formData);

    return response;
  };

  return {
    createAsset
  };
};
