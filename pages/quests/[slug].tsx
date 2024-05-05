import { Menubar } from "@/components/Menubar";
import { QuestDetailScreen } from "@/components/screens/QuestDetails";

export default function QuestDetails() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <QuestDetailScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
