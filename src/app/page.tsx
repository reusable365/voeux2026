import HeroStory from "@/components/HeroStory";
import HistorySection from "@/components/HistorySection";
import { ExplorationTechnique } from "@/components/ExplorationTechnique";
import ForgeDesRessources from "@/components/sections/ForgeDesRessources";
import EnergyTerritory from "@/components/sections/EnergyTerritory";
import Live2026Dashboard from "@/components/sections/Live2026Dashboard";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black overflow-hidden selection:bg-veolia-blue/30 selection:text-white">
        {/* Scrollable container for scrollytelling */}
        <div className="relative w-full">
          <HeroStory />
          <HistorySection />
          <ExplorationTechnique />
          <ForgeDesRessources />
          <EnergyTerritory />
          <Live2026Dashboard />
        </div>
      </main>
    </SmoothScroll>
  );
}
