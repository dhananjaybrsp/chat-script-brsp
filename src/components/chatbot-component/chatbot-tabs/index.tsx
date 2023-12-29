import React, { ReactNode, useState } from 'react';
import styles from './chatbottab.module.css';
interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ChatBotTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="px-4">
        <div className="justify-between rounded-md bg-[#54C7DE] flex gap-1 px-3 py-2 items-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={classNames(
                activeTab === tab.id ? 'bg-[#BFEEF8]' : 'bg-transparent',
                'whitespace-nowrap py-1.5 rounded px-3 text-sm font-medium text-black',
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className={`${styles.chatContentWrapper} p-4`}>
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? '' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBotTabs;
