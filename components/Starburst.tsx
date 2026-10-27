import { Lines } from "./Lines";

export function Starburst({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`starburst ${className}`} aria-hidden="true">
      <span>
        <Lines text={text} />
      </span>
    </div>
  );
}
