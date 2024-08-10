import { type CreateOptionInput, type UpdateOptionInput } from '../codegen/graphql';
import {
  CREATE_OPTION_MUTATION,
  REMOVE_OPTION_MUTATION,
  UPDATE_OPTION_MUTATION
} from '../operations';
import { fetcher } from './fetcher';

const create = async (productId: string, input: CreateOptionInput) => {
  const { createOption } = await fetcher(CREATE_OPTION_MUTATION, { productId, input });

  return createOption;
};

const update = async (id: string, input: UpdateOptionInput) => {
  const { updateOption } = await fetcher(UPDATE_OPTION_MUTATION, { id, input });

  return updateOption;
};

const remove = async (id: string) => {
  await fetcher(REMOVE_OPTION_MUTATION, { id });
};

export const optionService = {
  create,
  update,
  remove
};
