'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null); // 'good' | 'bad' | null
  const [view, setView] = useState('main'); // 'main' | 'pn-list' | 'pn-detail' | 'tio-list' | 'tio-detail'
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') { router.replace('/login'); return; }
    if (status !== 'authenticated') return;

    fetch('/api/content/today')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setFeedback(d.feedback ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('/api/sessions', { method: 'POST' }).catch(() => {});
  }, [status, router]);

  const handleFeedback = useCallback(async (value) => {
    if (!data?.mainCard) return;
    const next = feedback === value ? null : value;
    setFeedback(next);
    if (next) {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: data.mainCard.mainCardId, feedback: next }),
      }).catch(() => {});
    }
  }, [data, feedback]);

  if (loading || !data) return null;

  const { childName, dayNumber, weekNumber, mainCard, probablyNothings, activities } = data;
  const hasPn  = probablyNothings?.length > 0;
  const hasTio = activities?.length > 0;

  const mainContent = mainCard
    ? { title: mainCard.title, body: mainCard.body }
    : { title: 'Coming Soon!', body: 'Please hold.' };

  const goBack = () => {
    if (view === 'pn-detail')  { setView('pn-list');  return; }
    if (view === 'tio-detail') { setView('tio-list'); return; }
    setView('main');
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #faf7f2 0%, #f5e6e0 100%)' }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        {view !== 'main' ? (
          <button
            onClick={goBack}
            className="text-muted text-sm font-medium flex items-center gap-1 hover:text-avio-text transition-colors"
          >
            ← Back
          </button>
        ) : (
          <span className="font-serif text-lg text-avio-text">Avio</span>
        )}

        <span className="text-[0.65rem] font-medium tracking-[0.12em] uppercase text-muted absolute left-1/2 -translate-x-1/2">
          Dashboard
        </span>

        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-[0.7rem] font-medium tracking-[0.08em] uppercase text-muted hover:text-avio-text transition-colors"
        >
          Sign Out
        </button>
      </nav>

      {/* Child name */}
      <p className="text-center text-[0.75rem] font-medium tracking-[0.1em] uppercase text-muted pt-1 pb-4">
        {childName}
      </p>

      {/* Card area */}
      <div className="flex-1 px-4 pb-8 flex flex-col">
        {view === 'main'       && <MainCard mainContent={mainContent} dayNumber={dayNumber} weekNumber={weekNumber} feedback={feedback} onFeedback={handleFeedback} hasPn={hasPn} hasTio={hasTio} onPn={() => setView('pn-list')} onTio={() => setView('tio-list')} mainCard={mainCard} />}
        {view === 'pn-list'    && <ListCard title="Probably Nothing" items={probablyNothings} itemKey="probablyNothingId" onSelect={i => { setSelectedIndex(i); setView('pn-detail'); }} />}
        {view === 'pn-detail'  && <DetailCard item={probablyNothings[selectedIndex]} />}
        {view === 'tio-list'   && <ListCard title="Try It Out" items={activities} itemKey="activityId" onSelect={i => { setSelectedIndex(i); setView('tio-detail'); }} />}
        {view === 'tio-detail' && <DetailCard item={activities[selectedIndex]} />}
      </div>
    </div>
  );
}

function MainCard({ mainContent, dayNumber, weekNumber, feedback, onFeedback, hasPn, hasTio, onPn, onTio, mainCard }) {
  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up">
      {/* Week · Day */}
      <p className="text-[0.65rem] font-medium tracking-[0.14em] uppercase text-muted/60 mb-5">
        Week {weekNumber} · Day {dayNumber}
      </p>

      {/* Title */}
      <h1 className="font-serif text-[1.75rem] leading-snug text-avio-text mb-4">
        {mainContent.title}
      </h1>

      {/* Body */}
      <p className="text-[0.9rem] font-light leading-[1.75] text-avio-text/80 flex-1">
        {mainContent.body}
      </p>

      {/* Feedback — right-aligned below body */}
      {mainCard && (
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => onFeedback('good')}
            className={`text-xl transition-opacity duration-200 ${feedback === 'good' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
            aria-label="Helpful"
          >
            👍
          </button>
          <button
            onClick={() => onFeedback('bad')}
            className={`text-xl transition-opacity duration-200 ${feedback === 'bad' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
            aria-label="Not helpful"
          >
            👎
          </button>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={onPn}
          disabled={!hasPn}
          className="flex-1 py-3 rounded-full border border-black/10 text-[0.8rem] font-medium text-avio-text bg-cream hover:bg-blush/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Probably Nothing
        </button>
        <button
          onClick={onTio}
          disabled={!hasTio}
          className="flex-1 py-3 rounded-full bg-accent text-white text-[0.8rem] font-medium hover:bg-[#b8897a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Try It Out
        </button>
      </div>
    </div>
  );
}

function ListCard({ title, items, itemKey, onSelect }) {
  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up">
      <h2 className="font-serif text-2xl text-avio-text mb-6">{title}</h2>
      <div className="space-y-3 flex-1">
        {items.map((item, i) => (
          <button
            key={item[itemKey]}
            onClick={() => onSelect(i)}
            className="w-full text-left px-4 py-4 rounded-2xl bg-cream hover:bg-blush/40 transition-colors"
          >
            <span className="text-[0.9rem] font-medium text-avio-text">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ item }) {
  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up">
      <h2 className="font-serif text-2xl leading-snug text-avio-text mb-5">{item.title}</h2>
      <p className="text-[0.9rem] font-light leading-[1.75] text-avio-text/80 flex-1">{item.body}</p>
    </div>
  );
}
