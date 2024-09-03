import { type CreateOptionInput, type UpdateOptionInput } from '../codegen/graphql';
import {
  CREATE_OPTION_MUTATION,
  REMOVE_OPTION_MUTATION,
  UPDATE_OPTION_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

export const OptionService = {
  async create(productId: string, input: CreateOptionInput) {
    const { createOption } = await fetcher(CREATE_OPTION_MUTATION, { productId, input });

    return createOption;
  },

  async update(id: string, input: UpdateOptionInput) {
    const { updateOption } = await fetcher(UPDATE_OPTION_MUTATION, { id, input });

    return updateOption;
  },

  async remove(id: string) {
    await fetcher(REMOVE_OPTION_MUTATION, { id });
  }
};
