import type { ReactNode } from "react";

export default function Pill({ children }: { children: ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
      style={{
        border: "1.5px solid #3be5a7",
        background: "rgba(59, 229, 167, 0.08)",
      }}
    >
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{
          color: "#3be5a7",
          fontFamily: "'Space Mono', monospace",
          fontWeight: 700,
        }}
      >
        {children}
      </span>
    </div>
  );
}
