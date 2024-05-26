import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { type CreateProductInput } from '@/lib/vendyx/codegen/graphql';
import { getProductErrorMessages } from '@/lib/vendyx/errors';
import { CreateProductMutation } from '@/lib/vendyx/mutations';

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
