import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const firstName = session.user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-muted mb-4">
          Dashboard
        </p>
        <h1 className="font-serif text-[clamp(2rem,5vw,3.2rem)] mb-4">
          Hello, {firstName}
        </h1>
        <p className="text-muted font-light text-sm max-w-xs leading-relaxed">
          Your Avio dashboard is on its way. More features coming soon.
        </p>
      </main>
      <Footer />
    </div>
  );
}
