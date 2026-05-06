import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const email = session.user.email;

  const profiles = await sql`SELECT child_name AS "childName", dob FROM user_profile WHERE email = ${email} LIMIT 1`;
  const profile = profiles[0];
  if (!profile) redirect('/onboarding');

  const dob = new Date(profile.dob);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dob.setHours(0, 0, 0, 0);

  const dayNumber  = Math.floor((today - dob) / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil(dayNumber / 7);

  const [mainCards, probablyNothings, activities] = await Promise.all([
    sql`SELECT main_card_id AS "mainCardId", title, body FROM content_main_card WHERE day_number = ${dayNumber} AND week_number = ${weekNumber} LIMIT 1`,
    sql`SELECT probably_nothing_id AS "probablyNothingId", title, body FROM content_probably_nothing WHERE day_number = ${dayNumber} AND week_number = ${weekNumber}`,
    sql`SELECT activity_id AS "activityId", title, body FROM content_activities WHERE day_number = ${dayNumber} AND week_number = ${weekNumber}`,
  ]);

  const mainCard = mainCards[0] ?? null;

  let initialFeedback = null;
  if (mainCard) {
    const fb = await sql`SELECT feedback FROM user_content_feedback WHERE email = ${email} AND content_id = ${mainCard.mainCardId} LIMIT 1`;
    initialFeedback = fb[0]?.feedback ?? null;
  }

  sql`INSERT INTO user_sessions (email) VALUES (${email})`.catch(() => {});

  return (
    <DashboardClient
      childName={profile.childName}
      dayNumber={dayNumber}
      weekNumber={weekNumber}
      mainCard={mainCard}
      probablyNothings={probablyNothings}
      activities={activities}
      initialFeedback={initialFeedback}
    />
  );
}
