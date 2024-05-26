"use client";

import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Menubar } from "@/components/Menubar";
import {
  BadgesScreen,
  BoostScreen,
  ConnectQuestScreen,
  HomeScreen,
  QuestScreen,
  RefsScreen,
  SocialQuestScreen,
  StatsScreen,
} from "@/components/screens";
import { ONE_SECOND } from "@/constants";
import { socketInstance } from "@/services/socket";
import { STORE_NAME, TBoost, TUser, useAppStore } from "@/services/store/store";
import { NextPageContext } from "next";

const screens = {
  badges: <BadgesScreen />,
  boost: <BoostScreen />,
  home: <HomeScreen />,
  refs: <RefsScreen />,
  stats: <StatsScreen />,
  quests: <QuestScreen />,
  social: <SocialQuestScreen />,
  wallet: <ConnectQuestScreen />,
};

export default function Home({ deviceType }: { deviceType: string }) {
  const isMobile = deviceType === "mobile";
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const screen = useAppStore(state => state.screen);
  const setUser = useAppStore(state => state.updateUser);
  const setPaidBoosts = useAppStore(state => state.setPaidBoosts);
  const setFreeBoosts = useAppStore(state => state.setFreeBoosts);
  const updateEnergyByTime = useAppStore(state => state.updateEnergyByTime);

  const screenRender = screens[screen];

  const setUpState = () => {
    const user: TUser = {
      id: 1248734702,
      username: "devdanhiel",
      first: "Daniel",
      last: "Ifechukwu",
      touches: 200000,
      balance: 800000,
      tapValue: 1,
      rank: -1,
      energy: {
        maxEnergy: 500,
        energyLeft: 500,
      },
      totalCoinsMined: 300000,
      connectionId: "",
      totalRefered: 100,
      totalReferedCliamed: 1,
    };

    const paidBoosts: TBoost[] = [
      { type: "paid", boostId: 4, level: 0, cost: 1000, maximumLevel: 10, userId: user.id },
      { type: "paid", boostId: 5, level: 0, cost: 500, maximumLevel: 20, userId: user.id },
      { type: "paid", boostId: 3, level: 0, cost: 250, maximumLevel: 10, userId: user.id },
      { type: "paid-no-levels", boostId: 6, cost: 200000, userId: 1278544551 },
    ];

    const freeBoosts: TBoost[] = [
      { type: "free", boostId: 1, totalPerDay: 3, userId: 1278544551, left: 3 },
      { type: "free", boostId: 2, totalPerDay: 3, userId: 1278544551, left: 3 },
    ];

    setUser(user);
    setPaidBoosts(paidBoosts);
    setFreeBoosts(freeBoosts);
  };

  useEffect(() => {
    const foundState = localStorage.getItem(STORE_NAME);
    if (!foundState || JSON.parse(foundState).state.defaultData) {
      setUpState();
    }

    const handleConnect = () => {
      setIsConnected(true);
      setTransport(socketInstance.io.engine.transport.name);
      socketInstance.io.engine.on("upgrade", (transport: { name: SetStateAction<string> }) => {
        setTransport(transport.name);
      });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setTransport("N/A");
    };

    if (socketInstance.connected) handleConnect();

    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);

    return () => {
      socketInstance.off("connect", handleConnect);
      socketInstance.off("disconnect", handleDisconnect);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(updateEnergyByTime, ONE_SECOND * 2);
    return () => clearInterval(interval);
  }, [updateEnergyByTime]);

  if (!isMobile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col w-full m-auto justify-center items-center">
          <div className="text-center mb-10">
            <p className="text-2xl text-white font-bold mt-2">Leave The Desktop.</p>
            <p className="text-2xl text-white font-bold mt-2">Mobile Gaming Rocks!</p>
          </div>
          <div>
            <Image className="rounded-lg" src="/img/qrCOde.png" alt="QR Code" width={300} height={300} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {screenRender}
      <div className="container mx-auto px-6">
        <Menubar />
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const UA = context.req?.headers["user-agent"] || "";
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}
