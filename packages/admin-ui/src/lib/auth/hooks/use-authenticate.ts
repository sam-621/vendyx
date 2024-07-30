import { AuthenticateMutation, getAdminErrorMessages, useGqlMutation } from '@/lib/shared';
import { type AuthenticateInput } from '@/lib/shared/ebloc/types';

export const useAuthenticate = () => {
  const { mutateAsync } = useGqlMutation(AuthenticateMutation);

  const authenticate = async (input: AuthenticateInput) => {
    const { authenticate } = await mutateAsync({ input });
    const { authToken, apiErrors } = authenticate;

    const error = getAdminErrorMessages(apiErrors[0]);

    if (error) {
      return { error };
    }

    return { authToken };
  };

  return {
    authenticate
  };
};
