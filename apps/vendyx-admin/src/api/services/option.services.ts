import { type CreateOptionInput, type UpdateOptionInput } from '../codegen/graphql';
import {
  CREATE_OPTION_MUTATION,
  REMOVE_OPTION_MUTATION,
  UPDATE_OPTION_MUTATION
} from '../operations/option.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const OptionService = {
  async create(productId: string, input: CreateOptionInput) {
    const { createOption } = await serviceGqlFetcher(CREATE_OPTION_MUTATION, { productId, input });

    return createOption;
  },

  async update(id: string, input: UpdateOptionInput) {
    const { updateOption } = await serviceGqlFetcher(UPDATE_OPTION_MUTATION, { id, input });

    return updateOption;
  },

  async remove(id: string) {
    await serviceGqlFetcher(REMOVE_OPTION_MUTATION, { id });
  }
};
