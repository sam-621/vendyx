import { useNavigate } from 'react-router-dom';

import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CollectionKeys } from '../../hooks';
import { useCreateCollection } from '../../hooks/use-create-collection';
import { useUpdateCollection } from '../../hooks/use-update-collection copy';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment) => {
  const navigate = useNavigate();
  const { createCollection } = useCreateCollection();
  const { updateCollection } = useUpdateCollection();

  const form = useForm<CollectionDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      slug: collection?.slug ?? '',
      description: collection?.description ?? '',
      published: collection?.published ?? false
    }
  });

  const onSubmit = async (input: CollectionDetailsFormInput) => {
    if (collection) {
      await onEdit(input);
    } else {
      await onCreate(input);
    }
  };

  const onCreate = async (input: CollectionDetailsFormInput) => {
    const { id, errorMessage } = await createCollection(input);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CollectionKeys.all });
    notification.success('Collection created');
    navigate(`/collections/${id}`);
  };

  const onEdit = async (input: CollectionDetailsFormInput) => {
    const { errorMessage } = await updateCollection(collection?.id ?? '', input);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CollectionKeys.all });
    notification.success('Collection updated');
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.maxChars(3)),
  slug: z.string().min(3, FormMessages.maxChars(3)),
  description: z.string().optional(),
  published: z.boolean()
} satisfies MakeAny<CollectionDetailsFormInput>);

export type CollectionDetailsFormInput = {
  name: string;
  slug: string;
  description: string;
  published: boolean;
};
