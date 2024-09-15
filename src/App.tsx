import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import "./App.css";
import exchangesArray from "../mock/data.json";
import { getExchanges, getStocks, sanitizeInput } from "./utils/helpers";
import { Reply, StockExchange } from "./types";
import ChatHistory from "./components/ChatHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faMaximize,
  faMinimize,
  faPaperPlane,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [chatHistory, setChatHistory] = useState<Array<Reply>>([
    { type: "bot", message: "Hello! Welcome to LSEG. I'm here to help you." },
  ]);
  const [currentMenuLevel, setcurrentMenuLevel] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [chatMinimized, setChatMinimized] = useState<boolean>(true);

  const chatInnerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const exchangeOptions = useMemo(() => getExchanges(exchangesArray), []);

  const showMainMenu = useCallback(() => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      {
        type: "bot",
        message: "Please select a Stock Exchange.",
        options: exchangeOptions,
      },
    ]);
  }, [exchangeOptions]);

  useEffect(() => {
    showMainMenu();
    setChatMinimized(false);
  }, [showMainMenu]);

  const handleExchange = useCallback((exchange: StockExchange) => {
    const stocks = getStocks(exchange.code);
    setcurrentMenuLevel(exchange.stockExchange);

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", message: exchange.stockExchange },
      {
        type: "bot",
        message: "Please select a stock.",
        options: stocks.map((stock) => ({
          name: stock.stockName,
        })),
      },
    ]);
  }, []);

  const handleStock = useCallback((optionName: string) => {
    const stock = exchangesArray
      .flatMap((exchange) => exchange.topStocks)
      .find(
        (stock) => stock.stockName.toLowerCase() === optionName.toLowerCase()
      );

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { type: "user", message: optionName },
      {
        type: "bot",
        message: stock
          ? `Stock Price of ${stock.stockName} is $${stock.price}. Please select an option.`
          : "Stock data not found. Please select a different option.",
        options: [{ name: "Main Menu" }, { name: "Go Back" }],
      },
    ]);
  }, []);

  const handleOptionSelect = useCallback(
    (optionName: string) => {
      const optionNameLowerCase = optionName.toLowerCase();
      const exchange = exchangesArray.find(
        (exchange) =>
          exchange.stockExchange.toLowerCase() === optionNameLowerCase
      );

      switch (optionNameLowerCase) {
        case "main menu":
          showMainMenu();
          break;
        case "go back":
          if (currentMenuLevel) {
            handleOptionSelect(currentMenuLevel);
          } else showMainMenu();
          break;
        default:
          if (exchange) {
            handleExchange(exchange);
          } else handleStock(optionName);
      }

      inputRef.current?.focus();
    },
    [currentMenuLevel, handleExchange, handleStock, showMainMenu]
  );

  useEffect(() => {
    if (chatInnerRef.current) {
      chatInnerRef.current.scrollTo({
        top: chatInnerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput) handleOptionSelect(sanitizeInput(userInput));
    setUserInput("");
  };

  const handleDowload = () => {
    const json = JSON.stringify(chatHistory, null, 2);
    const blob = new Blob([json], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chatbot-history.json";

    link.click();

    URL.revokeObjectURL(link.href);
  };

  const handleMinimize = () => {
    setChatMinimized(!chatMinimized);
    inputRef.current?.focus();
  };

  return (
    <>
      <h1>LSEG chatbot example</h1>
      <a href="https://github.com/pckltr/chatbot" target="_blank">
        https://github.com/pckltr/chatbot
      </a>
      <div className={`chatWrapper ${chatMinimized ? "minimized" : ""}`}>
        <div className="chatTitle">
          <span>
            <FontAwesomeIcon icon={faRobot} />
            LSEG chatbot
          </span>
          {chatMinimized ? (
            ""
          ) : (
            <button title="Download History" onClick={handleDowload}>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          )}
          <button
            title={chatMinimized ? "Maximize" : "Minimize"}
            onClick={handleMinimize}
          >
            {chatMinimized ? (
              <FontAwesomeIcon icon={faMaximize} />
            ) : (
              <FontAwesomeIcon icon={faMinimize} />
            )}
          </button>
        </div>
        <ChatHistory
          ref={chatInnerRef}
          chatHistory={chatHistory}
          onOptionSelect={handleOptionSelect}
        />
        <form onSubmit={handleSendMessage} className="inputForm">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Please pick or type an option."
            className="textInput"
          />
          <button title="Send Message" type="submit" className="sendButton">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
