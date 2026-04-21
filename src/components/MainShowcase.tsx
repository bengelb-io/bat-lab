import { useEffect, useState } from "react";
import BatViewer from "./BatViewer";
import PerformancePanel from "./PerformancePanel";
import PlayerScorePanel from "./PlayerScorePanel";

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

export default function MainShowcase() {
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
          <BatViewer />
        </div>

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
            <PerformancePanel />
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
            <PlayerScorePanel />
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
          <BatViewer />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-6">
            <PerformancePanel />
          </section>
          <section className="col-span-6">
            <PlayerScorePanel />
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
        <BatViewer />
      </section>
      <section>
        <PerformancePanel />
      </section>
      <section>
        <PlayerScorePanel />
      </section>
    </div>
  );
}
