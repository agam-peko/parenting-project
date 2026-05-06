'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingForm({ today }) {
  const router = useRouter();
  const [name, setName]     = useState('');
  const [dob, setDob]       = useState('');
  const [gender, setGender] = useState(null);
  const [error, setError]   = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return setError("Please enter your baby's name.");
    if (!dob)         return setError("Please enter your baby's date of birth.");
    const dobDate = new Date(dob);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    if (dobDate < thirtyDaysAgo) return setError("Avio is designed for babies up to 1 month old only.");
    if (!gender)      return setError("Please select your baby's gender.");

    setSaving(true);
    const res = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childName: name.trim(), dob, gender }),
    });

    if (!res.ok) {
      setError('Something went wrong. Please try again.');
      setSaving(false);
      return;
    }

    router.replace('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #faf7f2 0%, #f5e6e0 100%)' }}
    >
      <div className="bg-white rounded-[28px] shadow-[0_8px_48px_rgba(0,0,0,0.07)] p-8 w-full max-w-sm anim-fade-up">

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-blush flex items-center justify-center text-2xl mx-auto mb-4">
            🍼
          </div>
          <h2 className="font-serif text-2xl text-avio-text mb-2">Tell us about your baby</h2>
          <p className="text-sm text-muted font-light leading-relaxed">
            This helps Avio personalise the experience for your little one.
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-[0.7rem] font-medium tracking-[0.1em] uppercase text-muted mb-2">
              Baby's Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="e.g. Arjun"
              className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream text-avio-text text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[0.7rem] font-medium tracking-[0.1em] uppercase text-muted">
                Date of Birth
              </label>
              <span className="text-[0.65rem] text-muted/60 font-light">Only for 0–1 month</span>
            </div>
            <input
              type="date"
              value={dob}
              onChange={(e) => { setDob(e.target.value); setError(''); }}
              max={today}
              className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream text-avio-text text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-[0.7rem] font-medium tracking-[0.1em] uppercase text-muted mb-3">
              Gender
            </label>
            <div className="flex gap-3">
              <GenderCard
                label="Boy"
                icon="👦"
                selected={gender === 'boy'}
                selectedClass="border-sage bg-sage/30"
                onClick={() => { setGender('boy'); setError(''); }}
              />
              <GenderCard
                label="Girl"
                icon="👧"
                selected={gender === 'girl'}
                selectedClass="border-accent bg-blush/50"
                onClick={() => { setGender('girl'); setError(''); }}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-accent text-white text-sm font-medium rounded-full py-4 hover:bg-[#b8897a] transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : "Let's Begin"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GenderCard({ label, icon, selected, selectedClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-2xl p-5 border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
        selected ? selectedClass : 'border-transparent bg-cream hover:bg-blush/20'
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className={`text-sm font-medium transition-colors ${selected ? 'text-avio-text' : 'text-muted'}`}>
        {label}
      </span>
    </button>
  );
}
