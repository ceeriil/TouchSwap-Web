import { SetStateAction, useEffect, useState } from "react";
import { Menubar } from "@/components/Menubar";
import { BadgesScreen, BoostScreen, HomeScreen, QuestScreen, RefsScreen, StatsScreen } from "@/components/screens";
import { socketInstance } from "@/services/socket";
import { useAppStore } from "@/services/store/store";

const screens = {
  badges: <BadgesScreen />,
  boost: <BoostScreen />,
  home: <HomeScreen />,
  refs: <RefsScreen />,
  stats: <StatsScreen />,
  quests: <QuestScreen />,
};

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const screen = useAppStore(state => state.screen);
  const setScreen = useAppStore(state => state.setScreen);

  const screenRender = screens[screen];

  useEffect(() => {
    if (socketInstance.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socketInstance.id);
      setIsConnected(true);
      setTransport(socketInstance.io.engine.transport.name);

      socketInstance.io.engine.on("upgrade", (transport: { name: SetStateAction<string> }) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      {screenRender}
      <div className="container mx-auto px-6">
        <Menubar />
      </div>
    </>
  );
}
