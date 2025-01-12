import { RefreshCcw } from 'lucide-react';

import { LoaderSpiner } from '@/shared/components/loaders/loader-spiner';
import { InfoTooltip } from '@/shared/components/tooltips/info-tooltip';
import { Button } from '@/shared/components/ui/button';

import { useGenerateShopApiKey } from './use-generate-shop-api-key';

export const GenerateShopApiKeyButton = () => {
  const { isLoading, generateShopApiKey } = useGenerateShopApiKey();
  return (
    <InfoTooltip message="Regenerate shop api key">
      <Button
        type="button"
        size={'icon'}
        variant={'outline'}
        onClick={generateShopApiKey}
        disabled={isLoading}
      >
        <span className="sr-only">Generate api key</span>
        {isLoading ? <LoaderSpiner /> : <RefreshCcw size={16} />}
      </Button>
    </InfoTooltip>
  );
};
