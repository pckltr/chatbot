export interface Stock {
  code: string;
  stockName: string;
  price: number;
}

export interface StockExchange {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
}

export interface Option {
  name: string;
}

export interface Reply {
  type: "user" | "bot";
  message: string;
  options?: Array<Option>;
}
