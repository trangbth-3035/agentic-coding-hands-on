"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { KudosPost } from "@/lib/saa/kudos";
import { addKudos } from "@/lib/saa/kudos-store";
import { SaaDropdownPanel, SaaDropdownItem } from "@/app/_components/saa-dropdown";

type WriteKudosCopy = Dictionary["kudosBoard"]["writeKudos"];

const MAX_ITEMS = 5;
const SAMPLE_IMAGE = "/saa/kudos-write-sample.png";

/** Rich-text toolbar glyphs (Figma mms_C). Visual-only formatting controls. */
const TOOLBAR = [
  { key: "bold", src: "/saa/kudos-rt-bold.svg" },
  { key: "italic", src: "/saa/kudos-rt-italic.svg" },
  { key: "strike", src: "/saa/kudos-rt-strike.svg" },
  { key: "list", src: "/saa/kudos-rt-list.svg" },
  { key: "link", src: "/saa/kudos-rt-link.svg" },
  { key: "quote", src: "/saa/kudos-rt-quote.svg" },
] as const;

/**
 * "Viết Kudo" compose modal (Figma screenId ihQ26W78P2): a cream card floating
 * over a dimmed board (the design's "Mask"), centred and scrollable. The
 * recipient field is a searchable dropdown; the hashtag picker (max 5) and image
 * gallery (max 5) are interactive; submitting pushes a new kudos onto the board's
 * session store so it appears at the top of the All Kudos list.
 */
export function WriteKudosModal({
  open,
  onClose,
  t,
  hashtags,
  recipients,
  senderName,
}: {
  open: boolean;
  onClose: () => void;
  t: WriteKudosCopy;
  hashtags: string[];
  recipients: string[];
  senderName: string;
}) {
  const [recipient, setRecipient] = useState("");
  const [recipientOpen, setRecipientOpen] = useState(false);
  const [recipientError, setRecipientError] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const reset = () => {
    setRecipient("");
    setRecipientOpen(false);
    setRecipientError(false);
    setTitle("");
    setBody("");
    setTags([]);
    setImages([]);
    setAnonymous(false);
    setTagOpen(false);
  };
  const close = () => {
    reset();
    onClose();
  };
  const toggleTag = (tag: string) =>
    setTags((cur) =>
      cur.includes(tag)
        ? cur.filter((t) => t !== tag)
        : cur.length < MAX_ITEMS
          ? [...cur, tag]
          : cur,
    );

  const filteredRecipients = recipients.filter((r) =>
    r.toLowerCase().includes(recipient.trim().toLowerCase()),
  );
  const pickRecipient = (name: string) => {
    setRecipient(name);
    setRecipientOpen(false);
    setRecipientError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setRecipientError(true);
      setRecipientOpen(true);
      return;
    }
    const post: KudosPost = {
      id: `u${Date.now()}`,
      sender: {
        name: anonymous ? t.anonymousName : senderName,
        role: "Sun*",
        rank: "new",
        avatar: "/saa/kudos-avatar-1.png",
      },
      receiver: {
        name: recipient.trim(),
        role: "Sun*",
        rank: "rising",
        avatar: "/saa/kudos-avatar-2.png",
      },
      time: t.justNow,
      hashtagTitle: title.trim() || t.titleLabel,
      body: body.trim() || t.bodyPlaceholder,
      photos: images.length,
      tags: tags.join(" "),
      hearts: "0",
      department: "",
      hashtags: tags,
    };
    addKudos(post);
    close();
    // Scroll the All Kudos list into view so the new card is visible.
    requestAnimationFrame(() =>
      document.getElementById("all-kudos")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      {/* backdrop click target */}
      <button
        aria-hidden
        tabIndex={-1}
        onClick={close}
        className="fixed inset-0 cursor-default"
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full max-w-[752px] flex-col gap-7 rounded-3xl bg-[#FFF8E1] p-6 text-saa-bg shadow-2xl sm:gap-8 sm:p-10"
        >
          <h2 className="text-center text-[26px] font-bold leading-[1.25] sm:text-[32px] sm:leading-10">
            {t.title}
          </h2>

          {/* B — Recipient (searchable dropdown) */}
          <FieldRow label={t.recipientLabel} required>
            <div className="relative">
              <input
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value);
                  setRecipientOpen(true);
                  setRecipientError(false);
                }}
                onFocus={() => setRecipientOpen(true)}
                placeholder={t.recipientPlaceholder}
                aria-haspopup="listbox"
                aria-expanded={recipientOpen}
                className={`h-14 w-full rounded-lg border bg-white px-6 pr-12 text-base font-semibold text-saa-bg outline-none placeholder:font-bold placeholder:text-[#999] ${
                  recipientError
                    ? "border-saa-red"
                    : "border-saa-gold-muted focus:border-saa-gold"
                }`}
              />
              <button
                type="button"
                onClick={() => setRecipientOpen((o) => !o)}
                aria-label={t.recipientLabel}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/saa/kudos-ic-down.svg"
                  alt=""
                  className={`h-6 w-6 transition-transform ${recipientOpen ? "rotate-180" : ""}`}
                />
              </button>
              {recipientOpen && (
                <>
                  <button
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setRecipientOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />
                  <SaaDropdownPanel className="absolute inset-x-0 z-20 mt-2 max-h-64 overflow-y-auto saa-no-scrollbar">
                    {filteredRecipients.length > 0 ? (
                      filteredRecipients.map((r) => (
                        <SaaDropdownItem
                          key={r}
                          active={r === recipient}
                          onClick={() => pickRecipient(r)}
                        >
                          {r}
                        </SaaDropdownItem>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm font-semibold text-white/50">
                        {t.noResults}
                      </p>
                    )}
                  </SaaDropdownPanel>
                </>
              )}
            </div>
            {recipientError && (
              <p className="mt-1.5 text-sm font-semibold text-saa-red">
                {t.recipientRequired}
              </p>
            )}
          </FieldRow>

          {/* B (Danh hiệu) — Title with helper text */}
          <FieldRow label={t.titleLabel} required>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              className="h-14 w-full rounded-lg border border-saa-gold-muted bg-white px-6 text-base font-semibold text-saa-bg outline-none placeholder:font-bold placeholder:text-[#999] focus:border-saa-gold"
            />
            <p className="mt-2 whitespace-pre-line text-sm font-bold leading-6 tracking-[0.15px] text-[#999]">
              {t.titleHint}
            </p>
          </FieldRow>

          {/* C + D — Rich-text editor */}
          <div>
            <div className="overflow-hidden rounded-lg border border-saa-gold-muted bg-white">
              <div className="flex items-stretch border-b border-saa-gold-muted">
                {TOOLBAR.map((tool) => (
                  <button
                    key={tool.key}
                    type="button"
                    className="grid h-10 w-14 place-items-center border-r border-saa-gold-muted transition hover:bg-saa-gold-light/20"
                    aria-label={tool.key}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tool.src} alt="" className="h-6 w-6" />
                  </button>
                ))}
                <button
                  type="button"
                  className="ml-auto px-4 text-sm font-bold tracking-[0.15px] text-[#E46060] transition hover:underline"
                >
                  {t.communityStandards}
                </button>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={t.bodyPlaceholder}
                className="h-[200px] w-full resize-none px-6 py-4 text-base font-semibold leading-6 text-saa-bg outline-none placeholder:font-bold placeholder:text-[#999]"
              />
            </div>
            <p className="mt-2 text-center text-base font-bold tracking-[0.5px] text-saa-bg">
              {t.mentionHint}
            </p>
          </div>

          {/* E — Hashtag (max 5) */}
          <FieldRow label={t.hashtagLabel} required inline>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-12 items-center gap-1.5 rounded-lg border border-saa-gold-muted bg-white px-3 text-sm font-bold text-saa-bg"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-label={`remove ${tag}`}
                    className="grid h-4 w-4 place-items-center rounded-full bg-[#D4271D] leading-none text-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/saa/kudos-ic-close-tiny.svg" alt="" className="h-2 w-2" />
                  </button>
                </span>
              ))}
              {tags.length < MAX_ITEMS && (
                <div className="relative">
                  <AddButton
                    label={t.hashtagLabel}
                    hint={t.maxFive}
                    onClick={() => setTagOpen((o) => !o)}
                    expanded={tagOpen}
                  />
                  {tagOpen && (
                    <>
                      <button
                        aria-hidden
                        tabIndex={-1}
                        onClick={() => setTagOpen(false)}
                        className="fixed inset-0 z-10 cursor-default"
                      />
                      <SaaDropdownPanel className="absolute left-0 z-20 mt-2 max-h-72 min-w-44 overflow-y-auto saa-no-scrollbar">
                        {hashtags.map((opt) => (
                          <SaaDropdownItem
                            key={opt}
                            active={tags.includes(opt)}
                            onClick={() => {
                              toggleTag(opt);
                              setTagOpen(false);
                            }}
                          >
                            {opt}
                          </SaaDropdownItem>
                        ))}
                      </SaaDropdownPanel>
                    </>
                  )}
                </div>
              )}
            </div>
          </FieldRow>

          {/* F — Image (max 5) */}
          <FieldRow label={t.imageLabel} inline>
            <div className="flex flex-wrap items-center gap-3">
              {images.map((src, i) => (
                <div key={i} className="relative h-20 w-20 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-20 w-20 rounded border border-saa-gold-light object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImages((cur) => cur.filter((_, j) => j !== i))}
                    aria-label="remove image"
                    className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#D4271D] ring-2 ring-[#FFF8E1]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/saa/kudos-ic-close-tiny.svg" alt="" className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
              {images.length < MAX_ITEMS && (
                <AddButton
                  label={t.imageLabel}
                  hint={t.maxFive}
                  onClick={() => setImages((cur) => [...cur, SAMPLE_IMAGE])}
                />
              )}
            </div>
          </FieldRow>

          {/* G — Anonymous */}
          <label className="flex cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="sr-only"
            />
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded border transition ${
                anonymous
                  ? "border-saa-gold bg-saa-gold"
                  : "border-[#999] bg-white"
              }`}
            >
              {anonymous && (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-saa-bg" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="text-lg font-bold text-[#666] sm:text-xl">
              {t.anonymous}
            </span>
          </label>

          {/* H — Actions */}
          <div className="flex gap-4 sm:gap-6">
            <button
              type="button"
              onClick={close}
              className="flex items-center justify-center gap-2 rounded border border-saa-gold-muted bg-saa-gold-light/10 px-8 py-4 text-base font-bold text-saa-bg transition hover:bg-saa-gold-light/20 sm:px-10"
            >
              {t.cancel}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/saa/kudos-ic-close.svg" alt="" className="h-6 w-6" />
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-saa-gold-light px-4 py-4 text-xl font-bold text-saa-bg transition hover:brightness-105"
            >
              {t.submit}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/saa/kudos-ic-send-dark.svg" alt="" className="h-6 w-6" />
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

/** Label-left / control-right field row, stacking on mobile. The 22px label is
 * pushed down so it centres against the 56px input (mode="center", default) or
 * sits at the top for multi-line / tag-group rows (mode="inline"). */
function FieldRow({
  label,
  required = false,
  inline = false,
  children,
}: {
  label: string;
  required?: boolean;
  inline?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
      <span
        className={`flex shrink-0 items-start gap-0.5 text-[22px] font-bold leading-7 text-saa-bg sm:w-[150px] ${
          inline ? "sm:pt-2.5" : "sm:pt-3.5"
        }`}
      >
        {label}
        {required && <span className="text-saa-red">*</span>}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

/** The "+ Label / Tối đa 5" add button shared by the Hashtag and Image rows. */
function AddButton({
  label,
  hint,
  onClick,
  expanded,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup={expanded !== undefined ? "menu" : undefined}
      aria-expanded={expanded}
      className="flex h-12 shrink-0 items-center gap-1 rounded-lg border border-saa-gold-muted bg-white px-2 text-left transition hover:bg-saa-gold-light/20"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/saa/kudos-ic-plus.svg" alt="" className="h-6 w-6" />
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-bold text-saa-bg">{label}</span>
        <span className="text-[11px] font-bold tracking-[0.5px] text-[#999]">
          {hint}
        </span>
      </span>
    </button>
  );
}
