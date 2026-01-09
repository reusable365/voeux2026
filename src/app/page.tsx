import HeroStory from "@/components/HeroStory";
import HistorySection from "@/components/HistorySection";
import ExcellenceNavire from "@/components/sections/ExcellenceNavire";
import { ExplorationTechnique } from "@/components/ExplorationTechnique";
import EnergyTerritory from "@/components/sections/EnergyTerritory";
import Live2026Dashboard from "@/components/sections/Live2026Dashboard";
import FactoryLife from "@/components/FactoryLife";
import { SmoothScroll } from "@/components/SmoothScroll";
import MediaSection from "@/components/sections/MediaSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black overflow-hidden selection:bg-veolia-blue/30 selection:text-white">
        {/* Scrollable container for scrollytelling */}
        <div className="relative w-full">
          <HeroStory />
          <HistorySection />
          <ExcellenceNavire />
          <ExplorationTechnique />
          <EnergyTerritory />
          <Live2026Dashboard />
          <MediaSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
