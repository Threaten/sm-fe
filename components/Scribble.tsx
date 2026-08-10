export function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg className={`scribble ${className}`} viewBox="0 0 130 62" fill="none" aria-hidden="true">
      <path d="M4 45C27 17 31 62 55 31C76 3 79 53 101 22C111 9 120 13 126 6" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>
      <path d="M105 5L126 6L119 27" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
