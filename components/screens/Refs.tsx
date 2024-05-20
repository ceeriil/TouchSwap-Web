import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "../Loader";
import { RefsIcon } from "../assets/RefsIcon";
import { RefeshInterval } from "@/constants";
import { getUserRefers } from "@/services/data/refers";
import { User } from "@/services/db/user";
import { useAppStore } from "@/services/store/store";

export const InviteComponent = () => {
  return (
    <div className="flex flex-col text-center items-center my-6 h-[70%] justify-center mt-8 ">
      <p className="text-[0.8rem]">You currently have zero referrals, Damn</p>
      <div className="my-4">
        <RefsIcon />
      </div>
      <button className="btn bg-white w-full text-black py-4 font-[500] rounded-lg align-baseline">
        Invite a Friend!
      </button>
    </div>
  );
};

export const RefsScreen: React.FC = () => {
  const [referredUsers, setReferredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useAppStore(state => state.user);

  const fetchReferredUsers = async () => {
    try {
      const users = await getUserRefers(user.id.toString());
      setReferredUsers(users);
    } catch (error) {
      console.error("Failed to fetch referred users", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReferredUsers();
    }, RefeshInterval);

    if (loading) {
      fetchReferredUsers();
    }
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col h-screen justify-center items-center">
        <Loader />
      </section>
    );
  }

  const refsList = referredUsers.length > 0 ? referredUsers : [];

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <div className="container mx-auto px-4 my-4 pb-16">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-3">Referrals</h2>
          <p className="text-[0.8rem] text-white font-[500]">Refer a friend</p>
          <p className="text-[#AFAFAF] text-[0.8rem] my-3">{refsList.length} referrals</p>
          <button className="btn bg-white px-3 text-black py-4 font-[500] rounded-lg align-baseline">
            Invite a Friend!
          </button>
        </div>

        <div className="bg-[#182334] h-[1px] w-full my-5" />
        {refsList.length === 0 ? (
          <InviteComponent />
        ) : (
          <div className="grid gap-1 my-8 mt-1">
            {refsList.map(({ username }, index) => (
              <div
                key={index}
                className="bg-[#81DBE233] py-[14px] px-4 rounded text-[0.8rem] font-[500] flex items-center overflow-y-scroll h-full"
              >
                <span className="mr-3">{index + 1}.</span>
                <Image src="/img/defaultImg.png" alt="default Profile Image" width={20} height={20} />
                <span className="ml-3">@{username}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
