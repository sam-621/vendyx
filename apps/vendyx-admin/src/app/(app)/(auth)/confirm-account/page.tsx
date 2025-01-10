import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';

export default function ConfirmAccountPage() {
  return (
    <div className="mx-auto max-w-sm text-center flex flex-col gap-4">
      <h1 className="h2">Confirm your account</h1>
      <p className="text-muted-foreground">
        We&apos;ve sent you to your email the instructions to confirm your account.
      </p>
      <Link href={'/shops'}>
        <Button>Got to shops</Button>
      </Link>
    </div>
  );
}
