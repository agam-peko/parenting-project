const KEY = 'avio_baby';

export function saveBabyProfile(profile) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function getBabyProfile() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearBabyProfile() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
