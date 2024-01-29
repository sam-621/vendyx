import { ApiError } from '@/lib/errors'
import { useGqlMutation } from '@/lib/gql'
import { notification } from '@/lib/notifications'
import { AuthenticateInput } from '@/lib/vendyx/codegen/graphql'
import { AuthenticateMutation } from '@/lib/vendyx/mutations'

export const useAuthenticate = () => {
  const { mutateAsync, isPending } = useGqlMutation(AuthenticateMutation)

  const authenticate = async (input: AuthenticateInput) => {
    try {
      const result = await mutateAsync({ input })
      console.log({ result, token: result.authenticate })
    } catch (error) {
      if (error instanceof ApiError) {
        notification.error(error.message)
      }
    }
  }

  return {
    authenticate,
    isPending,
  }
}
