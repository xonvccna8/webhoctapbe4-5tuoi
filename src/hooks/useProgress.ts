import { useEffect, useState } from 'react';

const STORAGE_KEY = 'math-adventure-progress';
const EVENTS_KEY = 'math-adventure-events';

function getKey(baseKey: string, scope?: string) {
  return scope ? `${baseKey}:${scope}` : baseKey;
}

export function useLocalProgress(scope = 'global') {
  const storageKey = getKey(STORAGE_KEY, scope);
  const [progress, setProgress] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? Number(raw) : 12;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, String(progress));
  }, [progress, storageKey]);

  const resetProgress = () => {
    localStorage.removeItem(storageKey);
    setProgress(12);
  };

  return { progress, setProgress, resetProgress };
}

export function useRecentEvents<T>(scope = 'global') {
  const storageKey = getKey(EVENTS_KEY, scope);
  const [events, setEvents] = useState<T[]>(() => {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as T[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events, storageKey]);

  const clearEvents = () => {
    localStorage.removeItem(storageKey);
    setEvents([]);
  };

  return { events, setEvents, clearEvents };
}
