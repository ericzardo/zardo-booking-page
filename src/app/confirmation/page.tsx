import { Suspense } from 'react';
import Client from './Client';

export const dynamic = 'force-dynamic';

export default function ConfirmationPage() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
