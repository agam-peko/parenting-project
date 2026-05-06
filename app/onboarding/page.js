import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import OnboardingForm from './OnboardingForm';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const profile = await prisma.userProfile.findUnique({
    where: { email: session.user.email },
  });

  if (profile) redirect('/dashboard');

  const today = new Date().toISOString().split('T')[0];

  return <OnboardingForm today={today} />;
}
