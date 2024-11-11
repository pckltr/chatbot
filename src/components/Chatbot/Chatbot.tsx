import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Message from "../Message/Message";
import Stocks from "../Stocks/Stocks";
import Exchanges from "../Exchanges/Exchanges";
import BottomButtons from "../BottomButtons/BottomButtons";
import stockData from "../../data/StockData";
import { MessageProps, Exchange, Stock } from "../../types/types";

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const selectedExchangeRef = useRef<Exchange | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (text: string | JSX.Element, isUser: boolean = false) => {
    if (!text) {
      console.error("Attempted to add a message with no text.");
      return;
    }

    const newMessage: MessageProps = { text, isUser };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    try {
      addMessage(t("greeting"));
      addExchangeTable();
    } catch (error) {
      console.error("Failed to initialize chatbot messages:", error);
      addMessage(t("error"));
    }
  }, [t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (
      messageEndRef.current &&
      typeof messageEndRef.current.scrollIntoView === "function"
    ) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addExchangeTable = () => {
    try {
      addMessage(
        <Exchanges
          exchanges={stockData}
          handleExchangeSelect={handleExchangeSelect}
        />
      );
    } catch (error) {
      console.error("Failed to load exchange table:", error);
      addMessage(t("errorLoadingExchanges"));
    }
  };

  const addStockTable = (exchange: Exchange) => {
    if (!exchange) {
      console.error("No exchange provided for adding stock table.");
      addMessage(t("noExchangeSelected"));
      return;
    }

    try {
      addMessage(
        <Stocks exchange={exchange} handleStockSelect={handleStockSelect} />
      );
    } catch (error) {
      console.error("Failed to load stock table:", error);
      addMessage(t("errorLoadingStocks"));
    }
  };

  const handleExchangeSelect = (exchange: Exchange) => {
    if (!exchange) {
      console.error("No exchange selected.");
      addMessage(t("noExchangeSelected"));
      return;
    }

    selectedExchangeRef.current = exchange;
    addMessage(
      t("exchangeSelected", { exchangeName: exchange.stockExchange }),
      true
    );
    addStockTable(exchange);
  };

  const handleStockSelect = (stock: Stock) => {
    if (!stock || !stock.stockName || !stock.price) {
      console.error("Invalid stock selected:", stock);
      addMessage(t("invalidStockSelection"));
      return;
    }

    addMessage(t("stockSelected", { stockName: stock.stockName }), true);
    addMessage(
      `${t("stockPrice")} ${stock.stockName} ${t("is")}: $${stock.price}.`
    );
    addMessage(
      <BottomButtons
        handleMainMenu={handleMainMenu}
        handleGoBack={handleGoBack}
      />
    );
  };

  const handleMainMenu = () => {
    addMessage(t("mainMenu"), true);
    addExchangeTable();
  };

  const handleGoBack = () => {
    addMessage(t("goBack"), true);
    if (selectedExchangeRef.current) {
      addStockTable(selectedExchangeRef.current);
    } else {
      addExchangeTable();
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto my-10 bg-white rounded shadow overflow-hidden flex flex-col"
      style={{ height: "75vh" }}
    >
      <div className="bg-blue-600 text-white py-4 px-6">
        <h3 className="text font-semibold">LSEG Chatbot</h3>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto space-y-4"
        style={{ maxHeight: "65vh" }}
      >
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="flex p-4 bg-white border-t border-gray-200">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Select an Option"
          disabled
        />
        <button className="ml-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
