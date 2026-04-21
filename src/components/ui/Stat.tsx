interface StatProps {
  label: string;
  value: string;
  unit?: string;
}

export default function Stat({ label, value, unit }: StatProps) {
  return (
    <div className="flex flex-col">
      <span
        className="text-[11px] uppercase tracking-[0.15em]"
        style={{ color: "#3be5a7", fontFamily: "'Space Mono', monospace" }}
      >
        {label}_
      </span>
      <span
        className="text-3xl leading-none mt-1"
        style={{
          color: "#fff200",
          fontFamily: "'Saira Condensed', 'Oswald', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        {value}
        {unit && (
          <span className="text-base ml-1" style={{ color: "#fff200" }}>
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}
