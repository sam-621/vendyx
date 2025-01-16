/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getFragmentData } from '../codegen';
import {
  type CreateUserInput,
  type GenerateUserAccessTokenInput,
  type UserErrorCode,
  type ValidateOtpInput
} from '../codegen/graphql';
import { getUserError } from '../errors/user.errors';
import {
  COMMON_USER_FRAGMENT,
  CREATE_USER_MUTATION,
  GENERATE_ACCESS_TOKEN_MUTATION,
  USER_HAS_SUBSCRIPTION_QUERY,
  VALIDATE_ACCESS_TOKEN_QUERY,
  VALIDATE_OTP_MUTATION,
  WHOAMI_QUERY
} from '../operations/user.operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const UserService = {
  Tags: {
    user: 'user'
  },

  async whoami() {
    const result = await serviceGqlFetcher(
      WHOAMI_QUERY,
      {},
      {
        tags: [UserService.Tags.user]
      }
    );

    const user = getFragmentData(COMMON_USER_FRAGMENT, result.whoami);

    if (!user) {
      throw new Error('Whoami used in no authenticated context');
    }

    return user;
  },

  async create(input: CreateUserInput): Promise<UserResult> {
    const {
      createUser: { apiErrors, user }
    } = await serviceGqlFetcher(CREATE_USER_MUTATION, { input });

    const error = getUserError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, userId: user?.id ?? '' };
  },

  async generateAccessToken(
    input: GenerateUserAccessTokenInput
  ): Promise<GenerateAccessTokenResult> {
    const {
      generateUserAccessToken: { apiErrors, accessToken }
    } = await serviceGqlFetcher(GENERATE_ACCESS_TOKEN_MUTATION, { input });

    const error = getUserError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, accessToken: accessToken! };
  },

  async validateAccessToken() {
    const result = await serviceGqlFetcher(VALIDATE_ACCESS_TOKEN_QUERY);

    return result.validateAccessToken;
  },

  async validateOtp(input: ValidateOtpInput): Promise<UserResult> {
    const {
      validateOtp: { apiErrors, user }
    } = await serviceGqlFetcher(VALIDATE_OTP_MUTATION, { input });

    const error = getUserError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, userId: user?.id ?? '' };
  },

  async hasSubscription() {
    const { whoami: user } = await serviceGqlFetcher(USER_HAS_SUBSCRIPTION_QUERY);

    return Boolean(user?.subscription?.id);
  }
};

type GenerateAccessTokenResult =
  | {
      success: true;
      accessToken: string;
    }
  | {
      success: false;
      error: string;
      errorCode: UserErrorCode;
    };

type UserResult =
  | {
      success: true;
      userId: string;
    }
  | {
      success: false;
      error: string;
      errorCode: UserErrorCode;
    };
