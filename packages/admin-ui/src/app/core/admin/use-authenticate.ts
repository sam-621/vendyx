import { cookies, CookiesKeys } from '@/lib/cookies';
import { ApiError } from '@/lib/errors';
import { useGqlMutation } from '@/lib/gql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { type AuthenticateInput } from '@/lib/vendyx/codegen/graphql';
import { AuthenticateMutation } from '@/lib/vendyx/mutations';

import { AdminKeys } from './admin-keys';

export const useAuthenticate = () => {
  const { mutateAsync, isPending } = useGqlMutation(AuthenticateMutation);

  const authenticate = async (input: AuthenticateInput) => {
    try {
      const result = await mutateAsync({ input });
      const token = result.authenticate;

      // TODO: Add expiry date
      cookies.set(CookiesKeys.TOKEN, token);

      await queryClient.invalidateQueries({ queryKey: AdminKeys.validate });
    } catch (error) {
      if (error instanceof ApiError) {
        notification.error(error.message);
      }
    }
  };

  return {
    authenticate,
    isPending
  };
};
