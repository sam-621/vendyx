import { type BaseSyntheticEvent, type FC, type PropsWithChildren } from 'react';
import { FormProvider as RHFormProvider, type UseFormReturn } from 'react-hook-form';

export const FormsProvider: FC<Props> = ({ methods, onSubmit, children }) => {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
};

type Props = PropsWithChildren & {
  methods: UseFormReturn;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};
