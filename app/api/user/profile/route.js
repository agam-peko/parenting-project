import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json(null, { status: 401 });

  const rows = await sql`SELECT child_name AS "childName", dob, gender FROM user_profile WHERE email = ${session.user.email} LIMIT 1`;
  return Response.json(rows[0] ?? null);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json(null, { status: 401 });

  const { childName, dob, gender } = await req.json();
  const email = session.user.email;

  await sql`
    INSERT INTO user_profile (email, child_name, dob, gender, updated_at)
    VALUES (${email}, ${childName}, ${dob}, ${gender}, NOW())
    ON CONFLICT (email) DO UPDATE SET child_name = ${childName}, dob = ${dob}, gender = ${gender}, updated_at = NOW()
  `;

  return Response.json({ ok: true });
}
