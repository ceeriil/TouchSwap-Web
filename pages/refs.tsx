import { Menubar } from "@/components/Menubar";
import { RefsScreen } from "@/components/screens/Refs";

export default function Refs() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <RefsScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
