import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import { UserAvatar } from '@/shared/components/user-avatar/user-avatar';

export default function WelcomePage() {
  return (
    <div className="grid pt-40 h-screen">
      <div>
        <div className="fixed top-6 right-6">
          <UserAvatar />
        </div>
        <div className="mx-auto max-w-sm text-center flex flex-col gap-4">
          <h1 className="h2">Welcome to vendyx</h1>
          <p className="text-muted-foreground">
            Now you can start managing your shops and products with ease.
          </p>
          <Link href={'/shops'}>
            <Button>Got to shops</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
