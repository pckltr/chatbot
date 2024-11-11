import React from 'react';
import { useTranslation } from 'react-i18next';
import { StocksProps } from '../../types/types';

const Stocks: React.FC<StocksProps> = ({ exchange, handleStockSelect }) => {
  const { t } = useTranslation();

  if (!exchange || !exchange.topStocks || exchange.topStocks.length === 0) {
    console.error("Exchange data or top stocks data is missing.");
    return <div>{t('noStockAvailable')}</div>;
  }

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-medium">{t('selectStock')}</th>
          </tr>
        </thead>
        <tbody>
          {exchange.topStocks.map((stock) => (
            <tr
              key={stock.code}
              onClick={() => {
                try {
                  handleStockSelect(stock);
                } catch (error) {
                  console.error("Failed to select stock:", error);
                  alert(t('errorSelectStock'));
                }
              }}
              className="cursor-pointer hover:bg-gray-100 text-center"
            >
              <td className="px-4 py-2">{stock.stockName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
