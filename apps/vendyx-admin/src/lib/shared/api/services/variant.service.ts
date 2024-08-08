import { type CreateVariantInput, type UpdateVariantInput } from '../codegen/graphql';
import {
  CREATE_VARIANT_MUTATION,
  REMOVE_VARIANT_MUTATION,
  UPDATE_VARIANT_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

const create = async (productId: string, input: CreateVariantInput) => {
  const { createVariant } = await fetcher(CREATE_VARIANT_MUTATION, { productId, input });

  return createVariant;
};

const update = async (id: string, input: UpdateVariantInput) => {
  const { updateVariant } = await fetcher(UPDATE_VARIANT_MUTATION, { id, input });

  return updateVariant;
};

const remove = async (id: string) => {
  const { softRemoveVariant } = await fetcher(REMOVE_VARIANT_MUTATION, { id });

  return softRemoveVariant;
};

export const variantService = {
  create,
  update,
  remove
};
