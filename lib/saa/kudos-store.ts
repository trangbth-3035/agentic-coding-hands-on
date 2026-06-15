/** Client-side store for kudos posted via the "Viết Kudo" modal during the
 * session. The compose modal pushes here; the All Kudos list subscribes with
 * useSyncExternalStore so newly-sent kudos appear immediately (mock — not
 * persisted). Kept separate from the static KUDOS_POSTS seed data. */

import type { KudosPost } from "./kudos";

let posts: KudosPost[] = [];
const EMPTY: KudosPost[] = [];
const listeners = new Set<() => void>();

/** Prepend a freshly-sent kudos so it shows at the top of the list. */
export function addKudos(post: KudosPost): void {
  posts = [post, ...posts];
  listeners.forEach((notify) => notify());
}

export function subscribeKudos(notify: () => void): () => void {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

export function getKudosSnapshot(): KudosPost[] {
  return posts;
}

/** Server render starts with no session posts (stable empty reference). */
export function getKudosServerSnapshot(): KudosPost[] {
  return EMPTY;
}
