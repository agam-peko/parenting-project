import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const email = session.user.email;

  const profile = await prisma.userProfile.findUnique({ where: { email } });
  if (!profile) redirect('/onboarding');

  const dob = new Date(profile.dob);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dob.setHours(0, 0, 0, 0);

  const dayNumber = Math.floor((today - dob) / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil(dayNumber / 7);

  const [mainCard, probablyNothings, activities] = await Promise.all([
    prisma.contentMainCard.findFirst({ where: { dayNumber, weekNumber } }),
    prisma.contentProbablyNothing.findMany({ where: { dayNumber, weekNumber } }),
    prisma.contentActivities.findMany({ where: { dayNumber, weekNumber } }),
  ]);

  let initialFeedback = null;
  if (mainCard) {
    const fb = await prisma.userContentFeedback.findUnique({
      where: { email_contentId: { email, contentId: mainCard.mainCardId } },
    });
    initialFeedback = fb?.feedback ?? null;
  }

  prisma.userSession.create({ data: { email } }).catch(() => {});

  return (
    <DashboardClient
      childName={profile.childName}
      dayNumber={dayNumber}
      weekNumber={weekNumber}
      mainCard={mainCard ?? null}
      probablyNothings={probablyNothings}
      activities={activities}
      initialFeedback={initialFeedback}
    />
  );
}
