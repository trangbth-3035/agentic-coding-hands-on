import Image from 'next/image';
import { RANK_BADGE, type KudosPerson, type KudosPost } from '@/lib/saa/kudos';
import { LikeButton } from './like-button';

export type CardLabels = {
  copyLink: string;
  viewDetails: string;
};

function PersonBlock({ person }: { person: KudosPerson }) {
  const badge = RANK_BADGE[person.rank];
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <Image
        src={person.avatar}
        alt={person.name}
        width={64}
        height={64}
        className="h-16 w-16 rounded-full border-2 border-white object-cover"
      />
      <div className="flex flex-col items-center gap-0.5">
        <p className="text-base font-bold leading-6 text-saa-bg">
          {person.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold leading-5 text-[#999]">
            {person.role}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#999]/40" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={badge.src} alt={badge.label} className="h-[19px] w-auto" />
        </div>
      </div>
    </div>
  );
}

export function KudosCard({
  post,
  labels,
  variant = 'full',
  status,
}: {
  post: KudosPost;
  labels: CardLabels;
  variant?: 'full' | 'highlight';
  /** Optional corner ribbon (e.g. "Spam" on the profile's sent kudos). */
  status?: string;
}) {
  const highlight = variant === 'highlight';

  return (
    <article
      className={
        highlight
          ? 'relative flex h-full w-[300px] shrink-0 flex-col gap-4 overflow-hidden rounded-2xl border-4 border-saa-gold-light bg-[#FFF8E1] p-6 pb-4 sm:w-[420px] lg:w-[528px]'
          : 'relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#FFF8E1] p-6 pb-4 sm:p-10 sm:pb-4'
      }
    >
      {status && (
        // Floating badge inset from the top-right corner (design): a small
        // fully-rounded orange pill, not a tab glued to the card edge.
        <span className="absolute right-0 top-4 z-10  bg-[#FF8412] px-3 py-1 text-xs font-bold text-white">
          {status}
        </span>
      )}

      {/* Info user — sender · send icon · receiver */}
      <div className="flex items-start justify-between gap-4 sm:gap-6">
        <PersonBlock person={post.sender} />
        <div className="flex items-center self-stretch py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/saa/kudos-ic-send.svg" alt="" className="h-8 w-8" />
        </div>
        <PersonBlock person={post.receiver} />
      </div>

      <div className="h-px w-full bg-saa-gold-light" />

      {/* Content */}
      <div className="flex flex-col gap-4">
        <p className="text-base font-bold tracking-[0.5px] text-[#999]">
          {post.time}
        </p>

        <div className="relative flex items-center justify-center">
          <span className="text-base font-bold tracking-[0.5px] text-saa-bg">
            {post.hashtagTitle}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/saa/kudos-ic-pen-dark.svg"
            alt=""
            className="absolute right-0 h-8 w-8"
          />
        </div>

        <div className="rounded-xl border border-saa-gold-light bg-saa-gold-light/40 px-6 py-4">
          <p
            className={
              highlight
                ? 'saa-justify line-clamp-4 text-base font-bold leading-7 text-saa-bg sm:text-lg'
                : 'saa-justify text-lg font-bold leading-8 text-saa-bg sm:text-xl'
            }
          >
            {post.body}
          </p>
        </div>

        {!highlight && post.photos > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            {Array.from({ length: post.photos }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-saa-gold-muted bg-white p-1"
              >
                <Image
                  src="/saa/kudos-photo.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-base font-bold leading-6 tracking-[0.5px] text-saa-red">
          {post.tags}
        </p>
      </div>

      <div className="h-px w-full bg-saa-gold-light" />

      {/* Action row */}
      <div className="flex items-center justify-between gap-6">
        <LikeButton hearts={post.hearts} />
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded px-2 py-2 text-base font-bold text-saa-bg transition hover:opacity-70"
          >
            {labels.copyLink}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/saa/kudos-ic-link-dark.svg" alt="" className="h-6 w-6" />
          </button>
          {highlight && (
            <a
              href="#"
              className="inline-flex items-center gap-1 rounded px-2 py-2 text-base font-bold text-saa-bg transition hover:opacity-70"
            >
              {labels.viewDetails}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M7 17 17 7M9 7h8v8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
