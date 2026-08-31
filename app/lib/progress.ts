/**
 * Per-browser comic progress.
 * Lives in localStorage on the visitor's machine — the EliteBook never sees it.
 */
const STORAGE_KEY = "mnfst-progress";

export type ProgressStore = {
  v: 1;
  seenOpenAnimation: Record<string, boolean>;
  reading: Record<string, { pageIndex: number; updatedAt: number }>;
};

const emptyStore = (): ProgressStore => ({
  v: 1,
  seenOpenAnimation: {},
  reading: {},
});

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

export function loadProgress(): ProgressStore {
  if (!canUseStorage()) return emptyStore();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<ProgressStore>;
    if (parsed.v !== 1) return emptyStore();
    return {
      v: 1,
      seenOpenAnimation: parsed.seenOpenAnimation ?? {},
      reading: parsed.reading ?? {},
    };
  } catch {
    return emptyStore();
  }
}

export function saveProgress(store: ProgressStore): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function hasSeenOpenAnimation(volId: string): boolean {
  return Boolean(loadProgress().seenOpenAnimation[volId]);
}

export function markOpenAnimationSeen(volId: string): void {
  const store = loadProgress();
  store.seenOpenAnimation[volId] = true;
  saveProgress(store);
}

export function getLastPageIndex(volId: string): number {
  return loadProgress().reading[volId]?.pageIndex ?? 0;
}

export function setLastPageIndex(volId: string, pageIndex: number): void {
  const store = loadProgress();
  store.reading[volId] = { pageIndex, updatedAt: Date.now() };
  saveProgress(store);
}
