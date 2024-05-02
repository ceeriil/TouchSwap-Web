type QuestTabProps = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

export const QuestTab = ({ activeTab, setActiveTab }: QuestTabProps) => {
  return (
    <div role="tablist" className="tabs space-x-3 flex mb-6 text-sm">
      <a
        role="tab"
        className={`${activeTab === 0 ? "tab-active" : ""}`}
        onClick={() => setActiveTab(0)}
      >
        <p>Open Quests</p>
      </a>
      <a
        role="tab"
        className={` ${activeTab === 1 ? "tab-active" : ""}`}
        onClick={() => setActiveTab(1)}
      >
        <p>Referral Quests</p>
      </a>
    </div>
  );
};
