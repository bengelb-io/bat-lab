import BaseballBat from "./BaseballBat";

const gridBg = {
  backgroundColor: "#060e20",
  backgroundImage: [
    // major crosshairs — every 80px
    "linear-gradient(rgba(106, 156, 255, 0.12) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(106, 156, 255, 0.12) 1px, transparent 1px)",
    // minor hatch — every 20px
    "linear-gradient(rgba(106, 156, 255, 0.04) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(106, 156, 255, 0.04) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
} as const;

export default function BatViewer() {
  return (
    <div className="relative w-full h-full" style={gridBg}>
      <div className="absolute top-4 right-4 z-20 text-right pointer-events-none">
        <div
          className="text-[10px] tracking-[0.25em]"
          style={{
            color: "#3be5a7",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          DRAG · ORBIT<br />SCROLL · ZOOM
        </div>
      </div>
      <div className="w-full h-full">
        <BaseballBat />
      </div>
    </div>
  );
}
