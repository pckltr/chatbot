import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Exchanges from '../Exchanges';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';

describe('Exchanges Component', () => {
  const exchangesMock = [
    { code: 'NYSE', stockExchange: 'New York Stock Exchange' },
    { code: 'NASDAQ', stockExchange: 'NASDAQ' },
  ];

  const renderComponent = (exchanges = exchangesMock, handleExchangeSelect = jest.fn()) =>
    render(
      <I18nextProvider i18n={i18n}>
        <Exchanges exchanges={exchanges} handleExchangeSelect={handleExchangeSelect} />
      </I18nextProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText(i18n.t('selectStockExchange'))).toBeInTheDocument();
  });

  it('displays exchange options when exchanges data is provided', () => {
    renderComponent();
    exchangesMock.forEach((exchange) => {
      expect(screen.getByText(exchange.stockExchange)).toBeInTheDocument();
    });
  });

  it('displays message when exchanges data is missing or empty', () => {
    renderComponent([]);
    expect(screen.getByText(i18n.t('noExchangesAvailable'))).toBeInTheDocument();
  });

  it('calls handleExchangeSelect with correct exchange when an exchange is clicked', () => {
    const handleExchangeSelect = jest.fn();
    renderComponent(exchangesMock, handleExchangeSelect);

    const firstExchange = screen.getByText(exchangesMock[0].stockExchange);
    fireEvent.click(firstExchange);

    expect(handleExchangeSelect).toHaveBeenCalledWith(exchangesMock[0]);
  });

  it('handles error if handleExchangeSelect throws an exception', () => {
    const handleExchangeSelect = jest.fn(() => {
      throw new Error('Selection error');
    });
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    window.alert = jest.fn();

    renderComponent(exchangesMock, handleExchangeSelect);

    const firstExchange = screen.getByText(exchangesMock[0].stockExchange);
    fireEvent.click(firstExchange);

    expect(consoleErrorMock).toHaveBeenCalledWith('Failed to select exchange:', expect.any(Error));

    consoleErrorMock.mockRestore();
    jest.restoreAllMocks();
  });
});
