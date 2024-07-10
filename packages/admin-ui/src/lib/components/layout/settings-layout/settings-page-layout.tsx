import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { ChevronLeftIcon } from 'lucide-react';

export const SettingsPageLayout: FC<Props> = ({ title, subtitle, backUrl, actions, children }) => {
  return (
    <div className="flex flex-col gap-6 max-w-3xl px-6 pb-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backUrl && (
            <div>
              <Link to={backUrl}>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 lg:h-9 lg:w-9">
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          )}
          <div>
            <h2 className="text-lg font-medium">{title}</h2>
            <p className="text-muted-foreground text-sm font-light">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-3">{actions}</div>
      </header>
      <hr />
      <main>{children}</main>
    </div>
  );
};

type Props = PropsWithChildren & {
  title?: string;
  subtitle?: string;
  backUrl?: string;
  actions?: ReactElement;
};
