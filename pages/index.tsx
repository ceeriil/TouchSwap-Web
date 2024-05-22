"use client";

import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Menubar } from "@/components/Menubar";
import { BadgesScreen, BoostScreen, HomeScreen, QuestScreen, RefsScreen, StatsScreen } from "@/components/screens";
import { ConnectQuestScreen } from "@/components/screens/ConnectQuest";
import { SocialQuestScreen } from "@/components/screens/SocialQuest";
import { isBrowser, socketInstance } from "@/services/socket";
import { emptyUser, STORE_NAME, TBoost, useAppStore } from "@/services/store/store";
import { ONE_SECOND } from "@/constants";


// import { headers } from "next/headers"
// import { getSelectorsByUserAgent } from "react-device-detect"

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

export default function Home() {
  const isMobile = true;

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const screen = useAppStore(state => state.screen);
  const setUser = useAppStore(state => state.updateUser);
  const setPaidBoosts = useAppStore(state => state.setPaidBoosts);
  const setFreeBoosts = useAppStore(state => state.setFreeBoosts);
  const updateEnergyByTime = useAppStore(state => state.updateEnergyByTime);


  const screenRender = screens[screen];

  const setUpState =()=>{
    let user = {
      id: 1248734702,
      username: "devdanhiel",
      first: "Daniel",
      last: "Ifechukwu",
      touches: 200000,
      balance: 20000000,
      tapValue: 1,
      rank: -1,
      referedBy: null,
      energy: {
        maxEnergy: 500,
        energyLeft: 500,
      },
      totalCoinsMined: 5000000
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
        maximumLevel: 20,
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
    const freeBoost: TBoost[] = [
      {
        type: "free",
        boostId: 1,
        totalPerDay: 3,
        userId: 1278544551,
        left: 3,
      },
      {
        type: "free",
        boostId: 2,
        totalPerDay: 3,
        userId: 1278544551,
        left: 3,
      },
    ];
    setUser(user);
    setPaidBoosts(paidBoost);
    setFreeBoosts(freeBoost);
  }

  useEffect(() => {
    let foundState = localStorage.getItem(STORE_NAME);
    if (foundState == null) { setUpState()}
    const currentState = JSON.parse(foundState!)
    if(currentState.state.defaultData) {
      setUpState()
    }

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
      console.log("Use Effect is ");
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
       updateEnergyByTime()
    }, ONE_SECOND*2);
    return () => clearInterval(interval);
  }, []);



  if (!isMobile) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="flex flex-col w-3/5  m-auto  justify-center items-center">
          <div className="text-center mb-10">
            <p className="text-4xl text-white font-bold mt-2"> Leave The Destop.</p>
            <p className="text-4xl text-white font-bold mt-2"> Mobile Gaming Rocks! </p>
          </div>
          <div>
            <Image className="rounded-lg" src={"/img/qrCOde.png"} alt="diamond" width={300} height={300} />
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
