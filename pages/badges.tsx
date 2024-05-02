import { Menubar } from "@/components/Menubar";
import { BadgesScreen } from "@/components/screens/Badges";

export default function Refs() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <BadgesScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
