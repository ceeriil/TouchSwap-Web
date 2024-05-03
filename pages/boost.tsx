import { Menubar } from "@/components/Menubar";
import { BoostScreen } from "@/components/screens/Boost";

export default function Boost() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <BoostScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
