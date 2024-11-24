/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type CreateUserInput,
  type GenerateUserAccessTokenInput,
  type UserErrorCode,
  type ValidateOtpInput
} from '../codegen/graphql';
import { getUserError } from '../errors';
import {
  CREATE_USER_MUTATION,
  GENERATE_ACCESS_TOKEN_MUTATION,
  GET_USER_QUERY,
  VALIDATE_ACCESS_TOKEN_QUERY,
  VALIDATE_OTP_MUTATION
} from '../operations';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const UserService = {
  Tags: {
    user: (accessToken: string) => `user-${accessToken}`
  },

  async get(accessToken: string) {
    const { user } = await serviceGqlFetcher(
      GET_USER_QUERY,
      { accessToken },
      { tags: [UserService.Tags.user(accessToken)] }
    );
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
