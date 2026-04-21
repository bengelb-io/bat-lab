import { useEffect, useState } from "react";

export default function ScoreHeader() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const d = new Date();
    setNow(
      d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    );
  }, []);

  return (
    <header className="grid grid-cols-12 gap-6 items-start mb-6">
      {/* OVERALL score tile */}
      <div className="col-span-12 md:col-span-2">
        <div
          className="text-[11px] tracking-[0.15em] font-bold pb-1"
          style={{
            color: "#3be5a7",
            fontFamily: "'Saira Condensed', sans-serif",
            borderBottom: "2px solid #3be5a7",
            letterSpacing: "0.1em",
          }}
        >
          OVERALL
        </div>
        <div
          className="text-[10px] tracking-[0.2em] mt-1"
          style={{ color: "#ffffff", opacity: 0.6 }}
        >
          GAMECHANGER
        </div>
        <div
          className="leading-none mt-1"
          style={{
            color: "#fff200",
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "3.5rem",
          }}
        >
          4.31
        </div>
        <div
          className="text-sm tracking-[0.2em]"
          style={{
            color: "#fff200",
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 600,
          }}
        >
          <span style={{ opacity: 0.8 }}>GC</span> GOLD
        </div>
      </div>

      {/* Big title */}
      <div className="col-span-12 md:col-span-8 text-center">
        <div
          className="text-2xl md:text-3xl leading-none"
          style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#ffffff",
          }}
        >
          LOUISVILLE SLUGGER
        </div>
        <div
          className="leading-none mt-1"
          style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.04em",
            color: "#fff200",
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
          }}
        >
          SUPRA
        </div>
        <div
          className="mx-auto mt-3"
          style={{
            width: "40%",
            height: 4,
            background: "#3be5a7",
            borderRadius: 2,
          }}
        />
        <div
          className="mt-2 text-xl leading-tight tracking-[0.15em]"
          style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 700,
            color: "#ffffff",
            opacity: 0.7,
          }}
        >
          TWO-PIECE COMPOSITE
        </div>
      </div>

      {/* Date badge (right) */}
      <div className="col-span-12 md:col-span-2 text-right">
        <div
          className="text-[10px] tracking-[0.25em]"
          style={{ color: "#3be5a7", fontFamily: "'Space Mono', monospace" }}
        >
          TEST_SERIES
        </div>
        <div
          className="mt-1 text-sm"
          style={{ color: "#ffffff", fontFamily: "'Space Mono', monospace" }}
        >
          #0427 · {now}
        </div>
      </div>
    </header>
  );
}
