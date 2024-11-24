'use client';

import {
  type FC,
  type MutableRefObject,
  type PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useTransition
} from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { notification } from '@/lib/shared/notifications';
import { wait } from '@/lib/shared/utils';

import { validateOtp } from '../actions/validate-otp';

export const OtpWrapper: FC<Props> = ({ children }) => {
  const notificationRef: MutableRefObject<string | number | null> = useRef(null);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    void (async () => {
      if (isLoading) {
        // wait 1 millisecond to prevent flickering
        await wait(1);
        notificationRef.current = notification.loading('Confirming account...');
      }

      if (!isLoading && notificationRef.current) {
        notification.dismiss(notificationRef.current);

        if (error) {
          notification.error(error);
        } else {
          notification.success('Account confirmed');
        }
      }
    })();
  }, [isLoading]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const otp = params.get('otp');

    if (!otp) return;

    startTransition(async () => {
      await wait(3000);
      const result = await validateOtp(otp);

      if (result?.error) {
        setError(result.error);
      }

      params.delete('otp');

      replace(pathname, { scroll: false });
    });
  }, []);

  return <>{children}</>;
};

type Props = PropsWithChildren;
