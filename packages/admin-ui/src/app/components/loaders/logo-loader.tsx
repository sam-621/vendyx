import { Logo } from '../items';

export const LogoLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full animate-pulse">
        <Logo className="animate-pulse" />
      </div>
    </div>
  );
};
