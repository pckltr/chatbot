import { forwardRef } from "react";
import "./ChatHistory.css";
import { Reply } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  chatHistory: Array<Reply>;
  onOptionSelect: (optionName: string) => void;
}

const ChatHistory = forwardRef<HTMLDivElement, ChatHistoryProps>(
  ({ chatHistory, onOptionSelect }, ref) => {
    return (
      <>
        <div className="chatInner" ref={ref}>
          {chatHistory.map(({ message, type, options }, replyIndex) => (
            <div
              key={replyIndex}
              className={`reply ${type === "bot" ? "botReply" : "userReply"}`}
              style={{
                animationDelay: `${
                  replyIndex === chatHistory.length - 1 ? 0.4 : 0.2
                }s`,
              }}
            >
              {type === "bot" ? <FontAwesomeIcon icon={faRobot} /> : null}
              <div className="replyInner">
                <p>{message}</p>
                {type === "bot" && options && (
                  <ul className="answerOptions">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          replyIndex === chatHistory.length - 1 &&
                          onOptionSelect(option.name)
                        }
                        className={
                          replyIndex === chatHistory.length - 1
                            ? "clickable"
                            : ""
                        }
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
);

export default ChatHistory;
