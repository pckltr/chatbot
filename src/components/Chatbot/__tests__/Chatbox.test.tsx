import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../Chatbot';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      if (params?.exchangeName) return `${params.exchangeName}`;
      if (params?.stockName) return `${params.stockName}`;
      return key;
    },
  }),
}));

jest.mock('../../Message/Message', () => ({ text }: { text: string }) => <div>{text}</div>);
jest.mock('../../Stocks/Stocks', () => ({ exchange, handleStockSelect }: any) => (
  <div onClick={() => handleStockSelect(exchange.stocks[0])}>Stocks Table</div>
));
jest.mock('../../Exchanges/Exchanges', () => ({ exchanges, handleExchangeSelect }: any) => (
  <div onClick={() => handleExchangeSelect(exchanges[0])}>Exchange Table</div>
));
jest.mock('../../BottomButtons/BottomButtons', () => ({ handleMainMenu, handleGoBack }: any) => (
  <div>
    <button onClick={handleMainMenu}>Main Menu</button>
    <button onClick={handleGoBack}>Go Back</button>
  </div>
));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe('Chatbot Component', () => {
  beforeEach(() => {
    render(<Chatbot />);
  });

  test('initializes with greeting and exchange table', async () => {
    await waitFor(() => {
      expect(screen.getByText('greeting')).toBeInTheDocument();
      expect(screen.getByText('Exchange Table')).toBeInTheDocument();
    });
  });

  test('displays stock table upon exchange selection', async () => {
    fireEvent.click(screen.getByText('Exchange Table'));

    await waitFor(() => {
      expect(screen.getByText('Exchange selected: Exchange 1')).toBeInTheDocument();
      expect(screen.getByText('Stocks Table')).toBeInTheDocument();
    });
  });

  test('displays stock price and bottom buttons upon stock selection', async () => {
    fireEvent.click(screen.getByText('Exchange Table'));
    fireEvent.click(screen.getByText('Stocks Table'));

    await waitFor(() => {
      expect(screen.getByText('Stock selected: Stock 1')).toBeInTheDocument();
      expect(screen.getByText('stockPrice Stock 1 price: $100')).toBeInTheDocument();
      expect(screen.getByText('Main Menu')).toBeInTheDocument();
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });
  });

  test('returns to exchange table upon clicking Main Menu', async () => {
    fireEvent.click(screen.getByText('Exchange Table'));
    fireEvent.click(screen.getByText('Stocks Table'));
    fireEvent.click(screen.getByText('Main Menu'));

    await waitFor(() => {
      expect(screen.getByText('mainMenu')).toBeInTheDocument();
      expect(screen.getByText('Exchange Table')).toBeInTheDocument();
    });
  });

  test('returns to stock table upon clicking Go Back', async () => {
    fireEvent.click(screen.getByText('Exchange Table'));
    fireEvent.click(screen.getByText('Stocks Table'));
    fireEvent.click(screen.getByText('Go Back'));

    await waitFor(() => {
      expect(screen.getByText('goBack')).toBeInTheDocument();
      expect(screen.getByText('Stocks Table')).toBeInTheDocument();
    });
  });

  test('handles no exchange selected error', async () => {
    const addStockTable = jest.spyOn(console, 'error').mockImplementation();
    expect(addStockTable).toHaveBeenCalledWith('No exchange selected.');
  });

  test('scrolls to the bottom when a new message is added', async () => {
    const scrollToMock = jest.fn();
    global.scrollTo = scrollToMock;

    fireEvent.click(screen.getByText('Exchange Table'));
    fireEvent.click(screen.getByText('Stocks Table'));

    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalled();
    });
  });
});
