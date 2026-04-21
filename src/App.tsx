import ScoreHeader from "./components/ScoreHeader";
import MainShowcase from "./components/MainShowcase";
import DashboardFooter from "./components/DashboardFooter";

export default function ScoutingDashboard() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700;800;900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <div
        className="min-h-screen w-full p-6 md:p-10"
        style={{
          background: "#0a1028",
          color: "#ffffff",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <ScoreHeader />
        <MainShowcase />
        <DashboardFooter />
      </div>
    </>
  );
}
