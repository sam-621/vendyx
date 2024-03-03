import { useGqlMutation } from '@/lib/gql';
import { type CreateProductInput } from '@/lib/vendyx/codegen/graphql';
import { CreateProductMutation } from '@/lib/vendyx/mutations';

export const useCreateProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateProductMutation);

  const createProduct = async (input: CreateProductInput) => {
    const {
      createProduct: { id: productId }
    } = await mutateAsync({ createProductInput: input });

    return productId;
  };

  return {
    createProduct,
    isLoading: isPending
  };
};
