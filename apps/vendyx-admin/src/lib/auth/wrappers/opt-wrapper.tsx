'use client';

import { type FC, type PropsWithChildren, useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { notification } from '@/lib/shared/notifications';

import { validateOtp } from '../actions/validate-otp';

export const OtpWrapper: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    void (async () => {
      await wait(1);
      const params = new URLSearchParams(searchParams);
      const otp = params.get('otp');

      if (!otp) return;

      const notificationId = notification.loading('Confirming account...');

      await wait(3000);
      const result = await validateOtp(otp);

      if (result?.error) {
        notification.dismiss(notificationId);
        notification.error(result.error);
      } else {
        notification.dismiss(notificationId);
        notification.success('Account confirmed');
      }

      params.delete('otp');

      replace(pathname, { scroll: false });
    })();
  }, []);

  return <>{children}</>;
};

type Props = PropsWithChildren;

const wait = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));
