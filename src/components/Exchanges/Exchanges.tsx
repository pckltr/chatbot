import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExchangesProps } from '../../types/types';

const Exchanges: React.FC<ExchangesProps> = ({ exchanges, handleExchangeSelect }) => {
  const { t } = useTranslation();

  if (!exchanges || exchanges.length === 0) {
    console.error("Exchanges data is missing or empty.");
    return <div>{t('noExchangesAvailable')}</div>;
  }

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-medium">{t('selectStockExchange')}</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <tr
              key={exchange.code}
              onClick={() => {
                try {
                  handleExchangeSelect(exchange);
                } catch (error) {
                  console.error("Failed to select exchange:", error);
                }
              }}
              className="cursor-pointer hover:bg-gray-100 text-center"
            >
              <td className="px-4 py-2">{exchange.stockExchange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchanges;
