import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@ebloc/theme';
import { type LucideIcon } from 'lucide-react';

export const LayoutSidebarItem: FC<Props> = ({ isActive, icon: Icon, to, children }) => {
  return (
    <Link
      className={cn(
        'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
        {
          'text-primary bg-muted': isActive,
          'text-muted-foreground': !isActive
        }
      )}
      to={to}
    >
      <Icon size={16} />
      {children}
    </Link>
  );
};

type Props = {
  isActive: boolean;
  icon: LucideIcon;
  to: string;
  children: string;
};
