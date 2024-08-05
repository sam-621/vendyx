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
  GET_USER_QUERY
} from '../operations';
import { fetcher } from './fetcher';

const get = async (accessToken: string) => {
  return await fetcher(GET_USER_QUERY, { accessToken });
};

const create = async (input: CreateUserInput): Promise<UserResult> => {
  const {
    createUser: { apiErrors }
  } = await fetcher(CREATE_USER_MUTATION, { input });

  const error = getUserError(apiErrors[0]);

  if (error) {
    return { success: false, error, errorCode: apiErrors[0].code };
  }

  return { success: true };
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

export const userService = {
  get,
  create,
  generateAccessToken
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
    }
  | {
      success: false;
      error: string;
      errorCode: UserErrorCode;
    };
