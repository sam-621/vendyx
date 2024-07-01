import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';

export const useCollectionDetailsForm = (collection: CommonCollectionFragment) => {
  const form = useForm<CollectionDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      slug: collection?.slug ?? '',
      description: collection?.description ?? '',
      published: collection?.enabled ?? false
    }
  });

  const onSubmit = async (input: CollectionDetailsFormInput) => {};

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
