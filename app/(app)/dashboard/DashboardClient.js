'use client';

import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';

export default function DashboardClient({ childName, dayNumber, weekNumber, mainCard, probablyNothings, activities, initialFeedback }) {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [view, setView] = useState('main');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleFeedback = useCallback(async (value) => {
    if (!mainCard) return;
    const next = feedback === value ? null : value;
    setFeedback(next);
    if (next) {
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: mainCard.mainCardId, feedback: next }),
      }).catch(() => {});
    }
  }, [mainCard, feedback]);

  const goBack = () => {
    if (view === 'pn-detail')  { setView('pn-list');  return; }
    if (view === 'tio-detail') { setView('tio-list'); return; }
    setView('main');
  };

  const hasPn  = probablyNothings?.length > 0;
  const hasTio = activities?.length > 0;

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ background: 'linear-gradient(160deg, #faf7f2 0%, #f5e6e0 100%)' }}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0 relative">
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
      <p className="text-center text-[18px] font-medium tracking-[0.06em] text-avio-text pt-1 pb-4">
        {childName}
      </p>

      {/* Card area */}
      <div className="flex-1 px-4 pb-8 flex flex-col">
        {view === 'main'       && <MainCard mainCard={mainCard} dayNumber={dayNumber} weekNumber={weekNumber} feedback={feedback} onFeedback={handleFeedback} hasPn={hasPn} hasTio={hasTio} onPn={() => setView('pn-list')} onTio={() => setView('tio-list')} />}
        {view === 'pn-list'    && <ListCard title="Probably Nothing" items={probablyNothings} itemKey="probablyNothingId" onSelect={i => { setSelectedIndex(i); setView('pn-detail'); }} />}
        {view === 'pn-detail'  && <DetailCard item={probablyNothings[selectedIndex]} contentId={probablyNothings[selectedIndex].probablyNothingId} />}
        {view === 'tio-list'   && <ListCard title="Try It Out" items={activities} itemKey="activityId" onSelect={i => { setSelectedIndex(i); setView('tio-detail'); }} />}
        {view === 'tio-detail' && <DetailCard item={activities[selectedIndex]} contentId={activities[selectedIndex].activityId} />}
      </div>
    </div>
  );
}

function MainCard({ mainCard, dayNumber, weekNumber, feedback, onFeedback, hasPn, hasTio, onPn, onTio }) {
  const title = mainCard?.title ?? 'Coming Soon!';
  const body  = mainCard?.body  ?? 'Please hold.';

  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up text-center">

      {/* Today's Card */}
      <h1 className="font-serif text-[40px] leading-tight text-avio-text mb-4">
        Today's Card
      </h1>

      {/* Week · Day */}
      <p className="text-[14px] font-medium tracking-[0.1em] uppercase text-muted/60 mb-6">
        Week {weekNumber} · Day {dayNumber}
      </p>

      {/* Title */}
      <h2 className="font-serif text-[28px] leading-snug text-avio-text mb-4">
        {title}
      </h2>

      {/* Body */}
      <p className="text-[18px] font-light leading-[1.75] text-avio-text/80 flex-1">
        {body}
      </p>

      {/* Feedback */}
      {mainCard && (
        <div className="flex justify-center gap-5 mt-6">
          <button
            onClick={() => onFeedback('good')}
            className={`transition-opacity duration-200 ${feedback === 'good' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
            style={{ fontSize: 35 }}
            aria-label="Helpful"
          >
            👍
          </button>
          <button
            onClick={() => onFeedback('bad')}
            className={`transition-opacity duration-200 ${feedback === 'bad' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
            style={{ fontSize: 35 }}
            aria-label="Not helpful"
          >
            👎
          </button>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="flex gap-3 mt-6">
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
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up text-center">
      <h2 className="font-serif text-2xl text-avio-text mb-6">{title}</h2>
      <div className="space-y-3 flex-1">
        {items.map((item, i) => (
          <button
            key={item[itemKey]}
            onClick={() => onSelect(i)}
            className="w-full text-center px-4 py-4 rounded-2xl bg-cream hover:bg-blush/40 transition-colors"
          >
            <span className="text-[0.9rem] font-medium text-avio-text">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ item, contentId }) {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = async (value) => {
    const next = feedback === value ? null : value;
    setFeedback(next);
    if (next) {
      fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, feedback: next }),
      }).catch(() => {});
    }
  };

  return (
    <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] flex flex-col flex-1 p-6 anim-fade-up text-center">
      <h2 className="font-serif text-[28px] leading-snug text-avio-text mb-5">{item.title}</h2>
      <p className="text-[18px] font-light leading-[1.75] text-avio-text/80 flex-1">{item.body}</p>
      <div className="flex justify-center gap-5 mt-6">
        <button
          onClick={() => handleFeedback('good')}
          className={`transition-opacity duration-200 ${feedback === 'good' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
          style={{ fontSize: 35 }}
          aria-label="Helpful"
        >
          👍
        </button>
        <button
          onClick={() => handleFeedback('bad')}
          className={`transition-opacity duration-200 ${feedback === 'bad' ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
          style={{ fontSize: 35 }}
          aria-label="Not helpful"
        >
          👎
        </button>
      </div>
    </div>
  );
}
