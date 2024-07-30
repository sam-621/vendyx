import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@ebloc/theme';
import { type LucideIcon } from 'lucide-react';

export const AdminLayoutNavItem: FC<Props> = ({ to, label, icon: Icon, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium text-muted-foreground gap-2 flex items-center justify-start py-2 px-4 rounded-md hover:bg-muted hover:text-foreground transition-colors',
        isActive && 'bg-muted text-foreground'
      )}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  );
};

type Props = {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
};
