'use server';

import { UserService } from '@/api/services';

export const validateOtp = async (otp: string) => {
  const result = await UserService.validateOtp({ otp });

  if (!result.success) {
    return { error: result.error };
  }
};
