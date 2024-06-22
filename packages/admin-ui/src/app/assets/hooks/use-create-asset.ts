import { type EblocAsset } from '@/lib/ebloc/rest';
import { restFetcher } from '@/lib/rest';

export const useCreateAsset = () => {
  const createAsset = async (files: File[]) => {
    const formData = new FormData();

    files.forEach(file => {
      formData.append(`files`, file);
    });

    const response = await restFetcher<EblocAsset[]>({
      body: formData,
      url: 'upload',
      config: { method: 'POST' }
    });

    return response;
  };

  return {
    createAsset
  };
};
