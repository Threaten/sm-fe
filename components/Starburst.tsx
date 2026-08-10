export function Starburst({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`starburst ${className}`}><span>{children}</span></div>;
}
