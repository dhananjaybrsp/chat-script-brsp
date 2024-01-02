import React, { FC, ReactNode } from "react";
import "./index.css";

interface Props {
  children: ReactNode | ReactNode[];
}

const ChatComponent: FC<Props> = ({ children }) => {
  return (
    <div className="text-2xl text-sky-700 font-bold underline">{children}</div>
  );
};

export default ChatComponent;
