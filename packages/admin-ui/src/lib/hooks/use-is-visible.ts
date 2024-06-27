import { type MutableRefObject, useEffect, useState } from 'react';

export function useIsVisible(ref: MutableRefObject<HTMLElement | null>, options?: Options) {
  const [isIntersecting, setIntersecting] = useState(options?.defaultValue ?? false);

  useEffect(() => {
    if (!ref.current || !options?.canExecute) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: options?.threshold ?? 0 }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

type Options = {
  /**
   * @default false
   */
  defaultValue?: boolean;
  /**
   * @default false
   */
  canExecute?: boolean;
  /**
   * @default 0
   */
  threshold?: number;
};
