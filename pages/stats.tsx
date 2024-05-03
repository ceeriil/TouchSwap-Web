import { Menubar } from "@/components/Menubar";
import { StatsScreen } from "@/components/screens/Stats";

export default function Stats() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <StatsScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
