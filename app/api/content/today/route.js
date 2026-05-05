import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.userProfile.findUnique({
    where: { email: session.user.email },
  });

  if (!profile) {
    return Response.json({ error: 'Profile not found' }, { status: 404 });
  }

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

  let feedback = null;
  if (mainCard) {
    feedback = await prisma.userContentFeedback.findUnique({
      where: { email_contentId: { email: session.user.email, contentId: mainCard.mainCardId } },
    });
  }

  return Response.json({
    dayNumber,
    weekNumber,
    childName: profile.childName,
    mainCard: mainCard ?? null,
    probablyNothings,
    activities,
    feedback: feedback?.feedback ?? null,
  });
}
