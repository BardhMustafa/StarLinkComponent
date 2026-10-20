/** Small lime four-point star used as the ticker separator. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className={className}>
      <path
        d="M6 0c.3 2.7 1.6 4 6 6-4.4 2-5.7 3.3-6 6-.3-2.7-1.6-4-6-6 4.4-2 5.7-3.3 6-6z"
        fill="#D4FF3A"
      />
    </svg>
  );
}
