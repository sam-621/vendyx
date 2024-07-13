import { type FC, type ReactElement } from 'react';

export const EntitySearchEmptyState: FC<Props> = ({ title, description, action }) => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4 mx-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <p className="text-base text-muted-foreground">{description}</p>
        {action}
      </div>
    </div>
  );
};

type Props = {
  title: string;
  description: string;
  action: ReactElement;
};
