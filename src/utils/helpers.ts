import { StockExchange } from "../types";
import exhangesArray from "../../mock/data.json";

export const getExchanges = (data: StockExchange[]) => {
  return data.map((exchange) => ({ name: exchange.stockExchange }));
};

export const getStocks = (code: string) => {
  const exchange = exhangesArray.find((e) => e.code === code);
  return exchange ? exchange.topStocks : [];
};

export const sanitizeInput = (input: string) => {
  return input.replace(/[^a-zA-Z.]/g, "");
};
