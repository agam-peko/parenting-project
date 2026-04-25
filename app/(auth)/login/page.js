'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SleepingBaby from '@/components/illustrations/SleepingBaby';

export default function LoginPage() {
  const [screen, setScreen] = useState(1);
  const { status } = useSession();
  const router = useRouter();

  // Already logged in — go straight to onboarding check
  useEffect(() => {
    if (status === 'authenticated') router.replace('/onboarding');
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') return null;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Slider container — 200% wide, shifted by -50% to reveal screen 2 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: '200%',
          minHeight: '100vh',
          transform: screen === 1 ? 'translateX(0)' : 'translateX(-50%)',
        }}
      >

        {/* ── Screen 1: Welcome ── */}
        <div
          className="flex flex-col relative"
          style={{
            width: '50%',
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #faf7f2 0%, #f5e6e0 55%, #e8e4f0 100%)',
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-between px-8 pt-14 pb-10">

            {/* Headline */}
            <div className="text-center anim-fade-up">
              <h1 className="font-serif text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.15] text-avio-text mb-3">
                Welcome to Avio
              </h1>
              <p className="text-[1rem] font-light text-muted leading-relaxed">
                Everything your baby needs.
              </p>
            </div>

            {/* Baby illustration */}
            <SleepingBaby className="w-full max-w-[280px] mx-auto" />

            {/* CTA */}
            <button
              onClick={() => setScreen(2)}
              className="anim-fade-up-delay w-full max-w-xs bg-accent text-white text-sm font-medium rounded-full py-4 hover:bg-[#b8897a] transition-colors duration-200 shadow-sm"
            >
              Get Started →
            </button>
          </div>

        </div>

        {/* ── Screen 2: Sign in ── */}
        <div
          className="flex flex-col items-center justify-center px-8 bg-cream"
          style={{ width: '50%', minHeight: '100vh' }}
        >
          <div className="w-full max-w-sm">

            <button
              onClick={() => setScreen(1)}
              className="text-sm text-muted hover:text-avio-text transition-colors mb-10 flex items-center gap-1"
            >
              ← Back
            </button>

            <div className="font-serif text-[1.5rem] tracking-[0.04em] text-avio-text mb-10">
              Avio
              <span className="inline-block w-2 h-2 bg-accent rounded-full ml-[3px] align-middle mb-1" />
            </div>

            <h2 className="font-serif text-3xl text-avio-text mb-2">Sign in</h2>
            <p className="text-sm text-muted font-light mb-8 leading-relaxed">
              Continue to Avio with your Google account
            </p>

            <button
              onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
              className="w-full bg-white border border-black/10 text-avio-text text-sm font-medium rounded-full py-4 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-3"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="text-xs text-muted mt-8 text-center leading-relaxed">
              By continuing, you agree to our{' '}
              <span className="underline cursor-pointer hover:text-avio-text transition-colors">Terms</span>
              {' '}and{' '}
              <span className="underline cursor-pointer hover:text-avio-text transition-colors">Privacy Policy</span>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}
