import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  color?: string;
};

export function SectionLabel({ children, color = "#111111" }: SectionLabelProps) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-muted">
      <span
        aria-hidden="true"
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {children}
    </p>
  );
}
