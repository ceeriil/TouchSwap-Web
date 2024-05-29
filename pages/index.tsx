"use client";

import { SetStateAction, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Menubar } from "@/components/Menubar";
import {
  BadgesScreen,
  BoostScreen,
  HomeScreen,
  QuestScreen,
  RefsScreen,
  StatsScreen,
  ConnectQuestScreen,
  SocialQuestScreen,
} from "@/components/screens";
import { ONE_SECOND } from "@/constants";
import { socketInstance } from "@/services/socket";
import {
  hasState,
  STORE_NAME,
  TAppStore,
  useAppStore,
} from "@/services/store/store";
import { NextPageContext } from "next";
import { initInitData, isSSR } from "@tma.js/sdk-react";
import { Loader } from "@/components/Loader";
import {
  getFreeBoost,
  getNoLevelBoost,
  getPayedBoost,
} from "@/services/data/boost";
import { getUser } from "@/services/data/user";
import { notification } from "@/utils/notifications";
import { checkIfMoreThanADay } from "@/utils";

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
  const screen = useAppStore((state) => state.screen);
  const setUser = useAppStore((state) => state.updateUser);
  const setPaidBoosts = useAppStore((state) => state.setPaidBoosts);
  const setFreeBoosts = useAppStore((state) => state.setFreeBoosts);
  const updateEnergyByTime = useAppStore((state) => state.updateEnergyByTime);
  const [foundState, setFoundState] = useState(false);
  const state = useAppStore((state) => state);
  const freeBoost = useAppStore((state) => state.freeBoosts);

  const screenRender = screens[screen];

  const setUpState = (id: number) => {
    Promise.all([
      getUser(id),
      getFreeBoost(id),
      getPayedBoost(id),
      getNoLevelBoost(id),
    ])
      .then(([user, freeBoost, payedBoost, noLevelBoost]) => {
        setUser(user);
        setPaidBoosts([...payedBoost, ...noLevelBoost]);
        setFreeBoosts(freeBoost);
        setFoundState(true);
      })
      .catch((err) => {
        notification.info("Error occurred");
      });
  };

  useEffect(() => {
    if (freeBoost.length > 0) {
      const boostData = freeBoost.map((boost) => {
        if (checkIfMoreThanADay(boost.lastUsed!)) {
          return { ...boost, left: boost.totalPerDay };
        }
        return boost;
      });
      setFreeBoosts(boostData);
    }
  }, []);

  useEffect(() => {
    if (!isSSR()) {
      if (state.hasData) setFoundState(true);
      else {
        let user = initInitData()?.user;
        if (user) setUpState(user.id);
      }
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
            <Image
              className="rounded-lg"
              src="/img/qrCOde.png"
              alt="QR Code"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!foundState) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
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
  const isMobile = Boolean(
    UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
  );

  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}

