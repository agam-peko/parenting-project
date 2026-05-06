import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import OnboardingForm from './OnboardingForm';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const rows = await sql`SELECT email FROM user_profile WHERE email = ${session.user.email} LIMIT 1`;
  if (rows[0]) redirect('/dashboard');

  const today = new Date().toISOString().split('T')[0];
  return <OnboardingForm today={today} />;
}
