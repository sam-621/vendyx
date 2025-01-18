'use client';

import { ChoosePlan } from '@/core/subscription/components/choose-plan/choose-plan';
import { ThemeSwitcher } from '@/shared/components/theme-switcher/theme-switcher';

export default function ChoosePlanPage() {
  return (
    <div className="grid pt-40 h-screen">
      <div>
        <div className="fixed top-6 right-6">
          <ThemeSwitcher />
        </div>
        <ChoosePlan />
      </div>
    </div>
  );
}
