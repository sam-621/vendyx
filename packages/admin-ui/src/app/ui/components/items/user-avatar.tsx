import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useTheme
} from '@vendyx/theme';
import { LaptopIcon, LogOutIcon, MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';

import { useLogout } from '@/core/admin';

export const UserAvatar = () => {
  const { logout, isLoading } = useLogout();
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img src="/Avatar.png" alt="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoonIcon className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <SunIcon className="mr-2 h-4 w-4  scale-100 transition-all" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <LaptopIcon className="mr-2 h-4 w-4 transition-all " />
                  <span>System</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <MoonIcon className="mr-2 h-4 w-4 transition-all " />
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Button
            type="submit"
            variant={'ghost'}
            className="h-full w-full flex justify-start px-2 py-[6px]"
            onClick={logout}
            isLoading={isLoading}
          >
            {!isLoading && (
              <LogOutIcon className="mr-2 h-4 w-4 transition-all text-red-500 hover:text-red-500" />
            )}
            <span
              className={cn({
                'text-red-500 hover:text-red-500': !isLoading,
                'text-muted-foreground': isLoading
              })}
            >
              Logout
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
