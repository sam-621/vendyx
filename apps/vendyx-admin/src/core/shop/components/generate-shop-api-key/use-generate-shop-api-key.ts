import { useEffect, useState, useTransition } from 'react';

import { notification } from '@/shared/notifications/notifications';

import { generateShopApiKey } from '../../actions/generate-shop-api-key';

export const useGenerateShopApiKey = () => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success(
        'Shop API key has been generated. Remember change it wherever you are using it.'
      );
    }
  }, [isSuccess, isLoading]);

  const exec = () => {
    startTransition(async () => {
      await generateShopApiKey();
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    generateShopApiKey: exec
  };
};
