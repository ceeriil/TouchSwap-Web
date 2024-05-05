import React from "react";
import Image from "next/image";
import { RefsIcon } from "../assets/RefsIcon";

type RefsList = {
  name: string;
};

export const refsLists: RefsList[] = [
  {
    name: "awela_retired",
  },
  {
    name: "popinabula",
  },
  {
    name: "xclassfinna",
  },
  {
    name: "opticalboy",
  },
  {
    name: "perfortant",
  },
  {
    name: "christyfina",
  },
  {
    name: "folly_ade",
  },
  {
    name: "680able",
  },
  {
    name: "nftkinger123",
  },
  {
    name: "qwertyaz",
  },
];

export const RefsScreen = () => {
  return (
    <section>
      <div className="container mx-auto px-3 my-8">
        <h2 className="text-2xl font-[500] mb-3">Referrals</h2>
        <p className="text-[0.8rem] text-white">Refer a friend</p>
        <p className="text-[#AFAFAF] text-[0.8rem] my-3">{refsLists.length} referrals</p>
        {!refsLists || refsLists.length === 0 ? (
          <div className="flex flex-col text-center items-center my-6 h-full justify-center mt-16">
            <p className="text-[0.8rem]">You currently have zero referrals, Damn</p>
            <div className="my-8">
              <RefsIcon />
            </div>
            <button className="btn bg-white w-full text-black py-4 font-[500] rounded-lg align-baseline">
              Invite a Friend!
            </button>
          </div>
        ) : (
          <div className="grid gap-1 my-8">
            {refsLists.map(({ name }, index) => {
              return (
                <div
                  key={index}
                  className="light-green-gradient py-4 px-5 rounded-sm text-sm font-[500] flex items-center"
                >
                  <span className="mr-3">{index + 1}.</span>
                  <Image src={"/img/defaultImg.png"} alt="default Profile Image" width={20} height={20} />
                  <span className="ml-3"> @{name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
