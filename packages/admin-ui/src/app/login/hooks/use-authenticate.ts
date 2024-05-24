import { cookies, CookiesKeys } from '@/lib/cookies';
import { GraphqlError } from '@/lib/errors';
import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { type AuthenticateInput } from '@/lib/vendyx/codegen/graphql';
import { getAdminErrorMessages } from '@/lib/vendyx/errors';
import { AuthenticateMutation } from '@/lib/vendyx/mutations';

import { AdminKeys } from './admin-keys';

export const useAuthenticate = () => {
  const { mutateAsync, isPending } = useGqlMutation(AuthenticateMutation);

  const authenticate = async (input: AuthenticateInput) => {
    try {
      const { authenticate } = await mutateAsync({ input });
      const { authToken, apiErrors } = authenticate;

      const errorMessage = getAdminErrorMessages(apiErrors[0]);

      if (errorMessage) {
        notification.error(errorMessage);
        return;
      }

      // TODO: Add expiry date
      cookies.set(CookiesKeys.TOKEN, authToken);

      await queryClient.invalidateQueries({ queryKey: AdminKeys.validate });
    } catch (error) {
      if (error instanceof GraphqlError) {
        notification.error(error.message);
      }
    }
  };

  return {
    authenticate,
    isPending
  };
};
