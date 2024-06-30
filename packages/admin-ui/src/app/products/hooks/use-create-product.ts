import { type CreateProductInput } from '@/lib/ebloc/codegen/graphql';
import { getProductErrorMessages } from '@/lib/ebloc/errors';
import { CreateProductMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';

export const useCreateProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(CreateProductMutation);

  const createProduct = async (input: CreateProductInput) => {
    const {
      createProduct: { product, apiErrors }
    } = await mutateAsync({ createProductInput: input });

    const errorMessage = getProductErrorMessages(apiErrors[0]);

    if (errorMessage) {
      notification.error(errorMessage);
      return;
    }

    return product?.id;
  };

  return {
    createProduct,
    isLoading: isPending
  };
};
