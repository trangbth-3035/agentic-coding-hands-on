"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeKudos,
  getKudosSnapshot,
  getKudosServerSnapshot,
} from "@/lib/saa/kudos-store";
import { KudosCard, type CardLabels } from "./kudos-card";

/** Renders kudos sent via the compose modal this session, newest first, above
 * the static All Kudos list. Empty (renders nothing) until the user sends one. */
export function LiveKudosList({ labels }: { labels: CardLabels }) {
  const posts = useSyncExternalStore(
    subscribeKudos,
    getKudosSnapshot,
    getKudosServerSnapshot,
  );

  if (posts.length === 0) return null;

  return (
    <>
      {posts.map((post) => (
        <KudosCard key={post.id} post={post} labels={labels} />
      ))}
    </>
  );
}
