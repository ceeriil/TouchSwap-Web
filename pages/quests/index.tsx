import { Menubar } from "@/components/Menubar";
import { QuestScreen } from "@/components/screens/Quest";

export default function Quests() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <QuestScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
