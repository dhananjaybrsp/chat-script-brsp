import React from 'react';
import './index.css';
import ChatBotTabs from './components/chat-component/chatbot-tabs';
import ScriptTabContent from './components/chat-component/script-tab-content';
interface ChatComponentProps {
  closeChatBot: () => void;
  screenshotData: string;
  firstnameData: string;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ closeChatBot, screenshotData, firstnameData }) => {
  const tabs = [
    {
      id: 'tab1',
      label: 'Script',
      content: <ScriptTabContent screenshotData={screenshotData} firstnameData={firstnameData} />,
    },
    { id: 'tab2', label: 'Help', content: <div>Help</div> },
    { id: 'tab3', label: 'Transcript', content: <div>Transcript</div> },
  ];

  return (
    <div className="rounded-t-xl flex flex-col bg-[#7EDEF1] w-80 min-h-[520px] fixed bottom-0 right-10">
      {/* window header */}
      <div className="flex justify-between my-4 px-3">
        <h4 className="text-2xl font-medium m-0">Agent Assist</h4>
        <button type="button" onClick={closeChatBot} className="flex justify-center items-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div>
        <ChatBotTabs tabs={tabs} />
      </div>
    </div>
  );
};
