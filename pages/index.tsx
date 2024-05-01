import { Header } from "@/components/Header";
import { Menubar } from "@/components/Menubar";
import { HomeScreen } from "@/components/screens/Home";

export default function Home() {
  return (
    <main className="relative h-screen">
      <div className="h-full">
        <Header />
        <HomeScreen />
        <div className="container mx-auto px-6">
          <Menubar />
        </div>
      </div>
    </main>
  );
}
