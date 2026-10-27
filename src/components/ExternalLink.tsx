"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Optional aria-label for the trigger link */
  ariaLabel?: string;
}

export default function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
}: ExternalLinkProps) {
  const [open, setOpen] = useState(false);
  const continueRef = useRef<HTMLAnchorElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the "Continue" button when the modal opens
  useEffect(() => {
    if (open) {
      // Small delay so the element is rendered before focus
      const t = setTimeout(() => continueRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Trap Tab inside modal
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = [continueRef.current, cancelRef.current].filter(Boolean) as HTMLElement[];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <>
      {/* Trigger link - prevents default navigation, opens modal instead */}
      <a
        href={href}
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
        className={className}
        aria-label={ariaLabel}
        rel="noopener noreferrer"
      >
        {children}
      </a>

      {/* Accessible modal dialog */}
      {open && (
        <div
          className="ext-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ext-modal-title"
          aria-describedby="ext-modal-desc"
          onKeyDown={handleKeyDown}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="ext-modal">
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-100 mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>

            <h2
              id="ext-modal-title"
              className="text-center text-lg font-semibold text-slate-900 mb-2"
            >
              You&apos;re leaving Digital Advantage
            </h2>
            <p
              id="ext-modal-desc"
              className="text-center text-sm text-slate-500 mb-6 leading-relaxed"
            >
              This link takes you to an external website:
              <br />
              <span className="text-slate-700 font-normal break-all">{href}</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Continue - real anchor that opens the URL */}
              <a
                ref={continueRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-green-400"
              >
                Continue
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Cancel */}
              <button
                ref={cancelRef}
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-slate-300"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
