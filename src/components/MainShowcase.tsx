import { useEffect, useState } from "react";
import BatViewer from "./BatViewer";
import PerformancePanel from "./PerformancePanel";
import PlayerScorePanel from "./PlayerScorePanel";
import type { BatPreset } from "../data/batPresets";

type Breakpoint = "sm" | "md" | "lg";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    return w >= 1024 ? "lg" : w >= 768 ? "md" : "sm";
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? "lg" : w >= 768 ? "md" : "sm");
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

interface Props {
  preset: BatPreset;
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const arrowBtn =
  "flex items-center justify-center w-10 h-10 rounded-sm cursor-pointer select-none";
const arrowStyle = {
  background: "rgba(10, 16, 40, 0.75)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(59, 229, 167, 0.3)",
  color: "#3be5a7",
  fontFamily: "'Space Mono', monospace",
  fontSize: 20,
};

function CycleOverlay({
  preset,
  activeIndex,
  total,
  onPrev,
  onNext,
}: Omit<Props, "preset"> & { preset: BatPreset }) {
  return (
    <>
      {/* Left arrow */}
      <button
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 ${arrowBtn}`}
        style={arrowStyle}
        onClick={onPrev}
        aria-label="Previous bat"
      >
        &lsaquo;
      </button>

      {/* Right arrow */}
      <button
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 ${arrowBtn}`}
        style={arrowStyle}
        onClick={onNext}
        aria-label="Next bat"
      >
        &rsaquo;
      </button>

      {/* Bottom center: model name + dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <div
          className="text-xs tracking-[0.2em]"
          style={{
            color: "#3be5a7",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {preset.model}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === activeIndex ? "#3be5a7" : "rgba(59, 229, 167, 0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function MainShowcase({
  preset,
  activeIndex,
  total,
  onPrev,
  onNext,
}: Props) {
  const bp = useBreakpoint();

  if (bp === "lg") {
    return (
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          minHeight: 640,
          height: 640,
          background: "#000000",
          border: "1px solid rgba(59, 229, 167, 0.25)",
        }}
      >
        <div className="absolute inset-0">
          <BatViewer preset={preset} />
        </div>

        <CycleOverlay
          preset={preset}
          activeIndex={activeIndex}
          total={total}
          onPrev={onPrev}
          onNext={onNext}
        />

        <div
          className="absolute top-0 left-0 bottom-0 z-10 p-6 pointer-events-none"
          style={{ width: "26%" }}
        >
          <div
            className="h-full p-5 rounded-sm"
            style={{
              background: "rgba(10, 16, 40, 0.75)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(59, 229, 167, 0.2)",
              pointerEvents: "auto",
            }}
          >
            <PerformancePanel preset={preset} />
          </div>
        </div>

        <div
          className="absolute top-0 right-0 bottom-0 z-10 p-6 pointer-events-none"
          style={{ width: "32%" }}
        >
          <div
            className="h-full p-5 rounded-sm"
            style={{
              background: "rgba(10, 16, 40, 0.75)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(59, 229, 167, 0.2)",
              pointerEvents: "auto",
            }}
          >
            <PlayerScorePanel preset={preset} />
          </div>
        </div>
      </div>
    );
  }

  if (bp === "md") {
    return (
      <div>
        <div
          className="relative rounded-sm overflow-hidden mb-6"
          style={{
            minHeight: 520,
            height: 520,
            background: "#000000",
            border: "1px solid rgba(59, 229, 167, 0.25)",
          }}
        >
          <BatViewer preset={preset} />
          <CycleOverlay
            preset={preset}
            activeIndex={activeIndex}
            total={total}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-6">
            <PerformancePanel preset={preset} />
          </section>
          <section className="col-span-6">
            <PlayerScorePanel preset={preset} />
          </section>
        </div>
      </div>
    );
  }

  // sm
  return (
    <div className="flex flex-col gap-12">
      <section
        className="relative rounded-sm overflow-hidden"
        style={{
          minHeight: 420,
          height: 420,
          background: "#000000",
          border: "1px solid rgba(59, 229, 167, 0.25)",
        }}
      >
        <BatViewer preset={preset} />
        <CycleOverlay
          preset={preset}
          activeIndex={activeIndex}
          total={total}
          onPrev={onPrev}
          onNext={onNext}
        />
      </section>
      <section>
        <PerformancePanel preset={preset} />
      </section>
      <section>
        <PlayerScorePanel preset={preset} />
      </section>
    </div>
  );
}
