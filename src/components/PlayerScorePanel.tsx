import { useRef, useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { playerAttributes } from "../data/playerAttributes";
import BalancedBanner from "./BalancedBanner";

export default function PlayerScorePanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2
        className="text-3xl leading-none mb-3 text-center md:text-left"
        style={{
          fontFamily: "'Saira Condensed', sans-serif",
          fontWeight: 800,
          letterSpacing: "0.04em",
        }}
      >
        PLAYER SCORE
      </h2>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 340, minHeight: 340, flex: 1 }}
      >
        {width > 0 && (
          <RadarChart
            data={playerAttributes}
            outerRadius="70%"
            width={width}
            height={340}
          >
            <PolarGrid stroke="#3be5a7" strokeOpacity={0.35} />
            <PolarAngleAxis
              dataKey="attribute"
              tick={(props: Record<string, any>) => {
                const { x, y, payload, index } = props;
                const datum = playerAttributes[index];
                return (
                  <g>
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      fill="#3be5a7"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {(payload.value as string).toUpperCase()} AVG_
                    </text>
                    <text
                      x={x}
                      y={y + 8}
                      textAnchor="middle"
                      fill="#fff200"
                      style={{
                        fontFamily: "'Saira Condensed', sans-serif",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {(datum.value / 20).toFixed(2)}
                    </text>
                  </g>
                );
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              stroke="#3be5a7"
              strokeOpacity={0.2}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              stroke="#3be5a7"
              fill="#3be5a7"
              fillOpacity={0.15}
              strokeWidth={2}
              dot={{ fill: "#fff200", stroke: "#fff200", r: 4 }}
            />
          </RadarChart>
        )}
      </div>
      <div
        className="text-[11px] tracking-[0.2em] mb-2"
        style={{
          color: "#3be5a7",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        VERDICT_
      </div>
      <BalancedBanner />
    </div>
  );
}
