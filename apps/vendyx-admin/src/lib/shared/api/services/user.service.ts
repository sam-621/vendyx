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

const get = async (accessToken: string) => {
  const { user } = await fetcher(GET_USER_QUERY, { accessToken });
  return user;
};

const create = async (input: CreateUserInput): Promise<UserResult> => {
  const {
    createUser: { apiErrors, user }
  } = await fetcher(CREATE_USER_MUTATION, { input });

  const error = getUserError(apiErrors[0]);

  if (error) {
    return { success: false, error, errorCode: apiErrors[0].code };
  }

  return { success: true, userId: user?.id ?? '' };
};

const generateAccessToken = async (
  input: GenerateUserAccessTokenInput
): Promise<GenerateAccessTokenResult> => {
  const {
    generateUserAccessToken: { apiErrors, accessToken }
  } = await fetcher(GENERATE_ACCESS_TOKEN_MUTATION, { input });

  const error = getUserError(apiErrors[0]);

  if (error) {
    return { success: false, error, errorCode: apiErrors[0].code };
  }

  return { success: true, accessToken: accessToken! };
};

const validateAccessToken = async () => {
  const result = await fetcher(VALIDATE_ACCESS_TOKEN_QUERY);

  return result.validateAccessToken;
};

export const userService = {
  get,
  create,
  generateAccessToken,
  validateAccessToken
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
