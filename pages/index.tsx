import { Header } from "@/components/Header";
import { Menubar } from "@/components/Menubar";
import { HomeScreen } from "@/components/screens/Home";
import { EnergyBar } from "@/components/touchswap/EnergyBar";

export default function Home() {
  return (
    <main className="relative h-screen">
      <div className="container mx-auto px-6 h-full">
        <Header />
        <HomeScreen />
        <Menubar />
      </div>
    </main>
  );
}
