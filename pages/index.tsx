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
  const setUser = useAppStore(state => state.updateUser);
  const setPaidBoost = useAppStore(state => state.setPayedBoost);
  const setFreeBoost = useAppStore(state => state.setFreeBoost);

  const screenRender = screens[screen];

  useEffect(() => {
    let user = {
      id: 1248734702,
      username: "devdanhiel",
      first: "Daniel",
      last: "Ifechukwu",
      touches: 0,
      balance: 0,
      tapValue: 1,
      rank: 0,
      referedBy: null,
      energy: {
        maxEnergy: 1000,
        energyLeft: 500,
      },
    };

    let paidBoost = [
      {
        type: "paid",
        boostId: 4,
        level: 0,
        cost: 1000,
        maximumLevel: 10,
        userId: user.id,
      },
      {
        type: "paid",
        boostId: 5,
        level: 0,
        cost: 500,
        maximumLevel: 5,
        userId: user.id,
      },
      {
        type: "paid",
        boostId: 3,
        level: 0,
        cost: 250,
        maximumLevel: 10,
        userId: user.id,
      },
      {
        type: "paid-no-levels",
        boostId: 6,
        cost: 200000,
        userId: 1278544551,
      },
    ];

    const freeBoost = [
      {
        id: "UaCrGHtb6cv7rRsTTNwE",
        type: "free",
        boostId: 1,
        totalPerDay: 3,
        userId: 1278544551,
        exist: true,
      },
      {
        id: "zmXoFnjCUcGWypuhltWE",
        type: "free",
        boostId: 2,
        totalPerDay: 3,
        userId: 1278544551,
        exist: true,
      },
    ];

    setUser(user);
    setPaidBoost(paidBoost);
    setFreeBoost(freeBoost);

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
