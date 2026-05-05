import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { contentId, feedback } = await req.json();
  if (!contentId || !['good', 'bad'].includes(feedback)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await prisma.userContentFeedback.upsert({
    where: { email_contentId: { email: session.user.email, contentId } },
    update: { feedback },
    create: { email: session.user.email, contentId, feedback },
  });

  return Response.json({ ok: true });
}
