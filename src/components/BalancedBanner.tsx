export default function BalancedBanner() {
  return (
    <div className="mt-4 flex justify-center">
      <div
        className="flex items-center justify-center w-[90%] py-2"
        style={{
          background: "#3be5a7",
          clipPath:
            "polygon(3% 0, 97% 0, 100% 50%, 97% 100%, 3% 100%, 0 50%)",
        }}
      >
        <span
          className="text-base tracking-[0.3em]"
          style={{
            color: "#0a1028",
            fontFamily: "'Saira Condensed', sans-serif",
            fontWeight: 800,
          }}
        >
          BALANCED
        </span>
      </div>
    </div>
  );
}
