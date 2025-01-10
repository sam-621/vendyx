import { type CreateVariantInput, type UpdateVariantInput } from '../codegen/graphql';
import {
  CREATE_VARIANT_MUTATION,
  REMOVE_VARIANT_MUTATION,
  UPDATE_VARIANT_MUTATION
} from '../operations/variant.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const VariantService = {
  async create(productId: string, input: CreateVariantInput) {
    const { createVariant } = await serviceGqlFetcher(CREATE_VARIANT_MUTATION, {
      productId,
      input
    });

    return createVariant;
  },

  async update(id: string, input: UpdateVariantInput) {
    const { updateVariant } = await serviceGqlFetcher(UPDATE_VARIANT_MUTATION, { id, input });

    return updateVariant;
  },

  async remove(id: string) {
    const { softRemoveVariant } = await serviceGqlFetcher(REMOVE_VARIANT_MUTATION, { id });

    return softRemoveVariant;
  }
};
