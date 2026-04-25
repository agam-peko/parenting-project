import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json(null, { status: 401 });

  const profile = await prisma.userProfile.findUnique({
    where: { email: session.user.email },
  });

  return NextResponse.json(profile);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json(null, { status: 401 });

  const { childName, dob, gender } = await req.json();

  const profile = await prisma.userProfile.upsert({
    where:  { email: session.user.email },
    create: { email: session.user.email, childName, dob, gender },
    update: { childName, dob, gender },
  });

  return NextResponse.json(profile);
}
