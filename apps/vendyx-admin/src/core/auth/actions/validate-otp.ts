'use server';

import { revalidateTag } from 'next/cache';

import { UserService } from '@/api/services/user.service';

export const validateOtp = async (otp: string) => {
  const result = await UserService.validateOtp({ otp });

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(UserService.Tags.user);
};
