'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-[60px] py-7 max-sm:px-7">
      <Link href="/" className="font-serif text-[1.6rem] tracking-[0.04em] text-avio-text no-underline">
        Avio
        <span className="inline-block w-2 h-2 bg-accent rounded-full ml-[3px] align-middle mb-1" />
      </Link>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/dashboard" className="text-sm text-muted hover:text-avio-text transition-colors">
              Dashboard
            </Link>
            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <span className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-muted max-sm:hidden">
              Est. 2024
            </span>
            <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
              Sign in
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
