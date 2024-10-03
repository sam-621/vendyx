import { useEffect, useState, useTransition } from 'react';

import { type CommonShippingHandlersFragment, type Metadata } from '@/api';
import { useDialogContext } from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';
import { notification } from '@/lib/shared/notifications';

import { createShippingMethod } from '../../actions/create-shipping-method';
import { type ShipmentContext } from '../../contexts';

export const useAddShippingMethodForm = (shippingHandlers: CommonShippingHandlersFragment[]) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [handler, setHandler] = useState(shippingHandlers[0]);

  const {
    entity: { zone }
  } = useEntityContext<ShipmentContext>();
  const { setIsOpen } = useDialogContext();

  const [method, setMethod] = useState<FormInput>({
    handlerId: '',
    name: '',
    description: '',
    enabled: true,
    args: {}
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Shipping method created');
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading]);

  const setValue = (input: SetValueInput) => {
    setMethod(prev => {
      return {
        ...prev,
        [input.key]: input.value
      };
    });
  };

  const exec = () => {
    const isNameOrDescriptionEmpty = !method.description || !method.name;

    const isAnyArgNotFilled =
      (JSON.parse(handler.metadata as string) as Metadata[]).length !==
      Object.keys(method.args).length;

    const isAnyArgWithEmptyValue = Object.values(method.args).some(arg => arg === '');

    if (isNameOrDescriptionEmpty || isAnyArgWithEmptyValue || isAnyArgNotFilled) {
      notification.error('Please fill all the fields');
      return;
    }

    startTransition(async () => {
      await createShippingMethod({
        name: method.name,
        description: method.description,
        enabled: method.enabled,
        zoneId: zone.id,
        handlerId: method.handlerId,
        handlerMetadata: method.args
      });

      setIsSuccess(true);
    });
  };

  return {
    method,
    setValue,
    handler,
    setHandler,
    createShippingMethod: exec,
    isLoading
  };
};

type SetValueInput =
  | {
      key: 'name' | 'description' | 'handlerId';
      value: string;
    }
  | {
      key: 'enabled';
      value: boolean;
    }
  | {
      key: 'args';
      value: any;
    };

type FormInput = {
  handlerId: string;
  name: string;
  description: string;
  enabled: boolean;
  args: Record<string, string>;
};
