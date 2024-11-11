export interface Exchange {
    code: string;
    stockExchange: string;
    topStocks?: Stock[];
  }
  
export interface Stock {
    code: string;
    stockName: string;
    price: number;
  }
  
export interface Message {
    text: string | JSX.Element;
    isUser: boolean;
  }
  
export interface ExchangesProps {
    exchanges: Exchange[];
    handleExchangeSelect: (exchange: Exchange) => void;
  }
  
export interface StocksProps {
    exchange: Exchange;
    handleStockSelect: (stock: Stock) => void;
  }
  
export interface BottomButtonsProps {
    handleMainMenu: () => void;
    handleGoBack: () => void;
  }
  
export interface MessageProps {
    text: string | JSX.Element;
    isUser: boolean;
  }
  