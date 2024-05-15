import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/screens/Home";

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <HomeScreen />
    </div>
  );
}
