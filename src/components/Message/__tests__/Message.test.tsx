import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../Message';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';

describe('Message Component', () => {
  const renderComponent = (text: string | JSX.Element, isUser: boolean) =>
    render(
      <I18nextProvider i18n={i18n}>
        <Message text={text} isUser={isUser} />
      </I18nextProvider>
    );

  it('renders user message with correct styling', () => {
    renderComponent('Hello, this is a user message.', true);
    const message = screen.getByText('Hello, this is a user message.');

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('bg-blue-600 text-white justify-self-end');
  });

  it('renders bot message with correct styling', () => {
    renderComponent('Hello, this is a bot message.', false);
    const message = screen.getByText('Hello, this is a bot message.');

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('bg-gray-200 text-black');
  });

it('renders JSX element as a message', () => {
  renderComponent(<span>JSX message element</span>, false);
  const message = screen.getByText('JSX message element').closest('div');

  expect(message).toBeInTheDocument();
  expect(message).toHaveClass('max-w-[80%] border-2');
});

  it('displays an error message when text is missing', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    renderComponent('', false);

    expect(screen.getByText(i18n.t('errorMessageLoading'))).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith('Message text is missing.');

    consoleErrorMock.mockRestore();
  });
});
