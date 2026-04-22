import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Stat from "./ui/Stat";
import type { BatPreset } from "../data/batPresets";

export default function PerformancePanel({ preset }: { preset: BatPreset }) {
  const { seasonHomeRuns } = preset;
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h2
          className="text-3xl leading-none mb-5 text-center md:text-left"
          style={{
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 800,
            letterSpacing: "0.04em",
          }}
        >
          PERFORMANCE
        </h2>
        <div className="flex flex-col gap-4">
          <Stat label="EXIT VELOCITY AVG" value={preset.stats.exitVelocity} unit="MPH" />
          <Stat label="DISTANCE AVG" value={preset.stats.distance} unit="'" />
          <Stat label="HOME RUN LAUNCH ANGLE AVG" value={preset.stats.launchAngle} unit="°" />
          <Stat label="BAT SPEED AVG" value={preset.stats.batSpeed} unit="MPH" />
        </div>
      </div>

      <div className="mt-auto">
        <div
          className="text-[11px] tracking-[0.2em] mb-3"
          style={{
            color: "#3be5a7",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          HOME_RUNS_BY_SEASON_
        </div>
        <div style={{ width: "100%", height: 160, minHeight: 160 }}>
          <ResponsiveContainer width="100%" height="100%" debounce={50}>
            <BarChart
              data={seasonHomeRuns}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="year"
                tick={{
                  fill: "#3be5a7",
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                }}
                axisLine={{ stroke: "#3be5a7", strokeOpacity: 0.3 }}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: "#3be5a7",
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                  opacity: 0.6,
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(59,229,167,0.08)" }}
                contentStyle={{
                  background: "#0a1028",
                  border: "1px solid #3be5a7",
                  borderRadius: 2,
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  color: "#fff200",
                }}
                formatter={(value) => [value, "HR"]}
                labelFormatter={() => ""}
                itemStyle={{ color: "#fff200" }}
              />
              <Bar dataKey="hr" radius={[2, 2, 0, 0]}>
                {seasonHomeRuns.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={
                      idx === seasonHomeRuns.length - 1
                        ? "#fff200"
                        : "#3be5a7"
                    }
                    fillOpacity={
                      idx === seasonHomeRuns.length - 1 ? 1 : 0.6
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
