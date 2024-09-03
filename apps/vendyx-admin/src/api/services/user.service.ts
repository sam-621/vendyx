/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type CreateUserInput,
  type GenerateUserAccessTokenInput,
  type UserErrorCode
} from '../codegen/graphql';
import { getUserError } from '../errors';
import {
  CREATE_USER_MUTATION,
  GENERATE_ACCESS_TOKEN_MUTATION,
  GET_USER_QUERY,
  VALIDATE_ACCESS_TOKEN_QUERY
} from '../operations';
import { fetcher } from './fetcher';

export const UserService = {
  Tags: {
    user: (accessToken: string) => `user-${accessToken}`
  },

  async get(accessToken: string) {
    const { user } = await fetcher(
      GET_USER_QUERY,
      { accessToken },
      { tags: [UserService.Tags.user(accessToken)] }
    );
    return user;
  },

  async create(input: CreateUserInput): Promise<UserResult> {
    const {
      createUser: { apiErrors, user }
    } = await fetcher(CREATE_USER_MUTATION, { input });

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
    } = await fetcher(GENERATE_ACCESS_TOKEN_MUTATION, { input });

    const error = getUserError(apiErrors[0]);

    if (error) {
      return { success: false, error, errorCode: apiErrors[0].code };
    }

    return { success: true, accessToken: accessToken! };
  },

  async validateAccessToken() {
    const result = await fetcher(VALIDATE_ACCESS_TOKEN_QUERY);

    return result.validateAccessToken;
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
