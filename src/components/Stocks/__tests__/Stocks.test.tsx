import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stocks from '../Stocks';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';

describe('Stocks Component', () => {
  const mockHandleStockSelect = jest.fn();

  const mockExchange = {
    stockExchange: 'Test Exchange',
    topStocks: [
      { code: 'TSLA', stockName: 'Tesla' },
      { code: 'AAPL', stockName: 'Apple' },
    ],
  };

  const renderComponent = (exchangeData: any) =>
    render(
      <I18nextProvider i18n={i18n}>
        <Stocks exchange={exchangeData} handleStockSelect={mockHandleStockSelect} />
      </I18nextProvider>
    );

  afterEach(() => {
    mockHandleStockSelect.mockClear();
  });

  it('renders stock table with valid data', () => {
    renderComponent(mockExchange);

    expect(screen.getByText('Tesla')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText(i18n.t('selectStock'))).toBeInTheDocument();
  });

  it('calls handleStockSelect when a stock is clicked', () => {
    renderComponent(mockExchange);
    const stockRow = screen.getByText('Tesla');

    fireEvent.click(stockRow);

    expect(mockHandleStockSelect).toHaveBeenCalledWith(mockExchange.topStocks[0]);
  });

  it('displays error message when exchange data is missing', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    renderComponent(null);

    expect(screen.getByText(i18n.t('noStockAvailable'))).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith('Exchange data or top stocks data is missing.');

    consoleErrorMock.mockRestore();
  });

  it('displays error message when topStocks array is empty', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    renderComponent({ stockExchange: 'Test Exchange', topStocks: [] });

    expect(screen.getByText(i18n.t('noStockAvailable'))).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith('Exchange data or top stocks data is missing.');

    consoleErrorMock.mockRestore();
  });
});
