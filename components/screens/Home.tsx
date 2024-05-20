import React, { useEffect, useState } from "react";
import { CoinTap } from "../CoinTap";
import { Header } from "../Header";
import { Modal } from "../ModalBase";
import { BottleIcon } from "../assets/BottleIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { ExtraTap } from "../touchswap/ExtraTap";
import { Refill } from "../touchswap/Refill";
import { ONE_SECOND } from "@/constants";
import { useAppStore } from "@/services/store/store";

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [extraTap, setExtraTap] = useState(false);
  const [refill, setRefill] = useState(false);

  const extraTapActive = useAppStore(state => state.extraTap);
  const setExtraTapGlobalState = useAppStore(state => state.setExtraTap);

  const useDailyRefill = useAppStore(state=> state.useDailyRefill)
  const energy = useAppStore(state=> state.user.energy)

  useEffect(() => {
    const interval = setTimeout(() => {
       setExtraTapGlobalState(false)
    },  ONE_SECOND * 30);
    return () => clearTimeout(interval);
  }, [extraTapActive]); 


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExtraTap = () => {
    setExtraTap(true);
    setShowModal(false);
    setExtraTapGlobalState(true)
  };

  const handleRefill = () => {
    setRefill(true);
    setShowRefillModal(false);
    useDailyRefill()
  };

  const handleExtraTapOpen = () => {
    setShowModal(true);
  };

  const handleRefillClose = ()=>{
    setShowRefillModal(false)
  }
  
  const useRefillDisabled = energy.energyLeft === energy.maxEnergy
  
  const handleRefillOpen = () => {
    setShowRefillModal(true);
  };

  const handleRefillClose = () => {
    setShowRefillModal(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <section className="">
        <div className="h-full flex flex-col items-center justify-center">
          <CoinTap extraTap={extraTap} refill={refill} />
          <div className="w-full flex justify-between mt-10 fixed bottom-[24%]">
            <button className={extraTapActive ? "opacity-60": "opacity-100"}  disabled={extraTapActive} onClick={handleExtraTapOpen}>
              <ExtraTap />
            </button>
            <button  className={useRefillDisabled ? "opacity-60": "opacity-100"}  disabled={useRefillDisabled}  onClick={handleRefillOpen} >
              <Refill />
            </button>
          </div>
        </div>
        <Modal
          title="Extra Tap"
          isOpen={showModal}
          onClose={handleCloseModal}
          onClick={handleExtraTap}
          icon={<DiamondIcon />}
          disabled={extraTapActive}
          cost={0}
          text={"Increases the amount of coins gained by 5x for 30 seconds. Does not consume energy while in effect."}
        />
        <Modal
          title="Daily Refill"
          isOpen={showRefillModal}
          onClose={handleRefillClose}
          onClick={handleRefill}
          icon={<BottleIcon />}
          cost={0}
          text={"Refill your energy bar quickly."}
          disabled= {energy.energyLeft === energy.maxEnergy}
        />
      </section>
    </div>
  );
};
