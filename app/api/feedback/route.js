import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { contentId, feedback } = await req.json();
  if (!contentId || !['good', 'bad'].includes(feedback)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const email = session.user.email;
  await sql`
    INSERT INTO user_content_feedback (email, content_id, feedback)
    VALUES (${email}, ${contentId}, ${feedback})
    ON CONFLICT (email, content_id) DO UPDATE SET feedback = ${feedback}
  `;

  return Response.json({ ok: true });
}
