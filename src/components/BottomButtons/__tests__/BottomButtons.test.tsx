import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BottomButtons from '../BottomButtons';
import { BottomButtonsProps } from '../../../types/types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

describe('BottomButtons Component', () => {
  const mockHandleMainMenu = jest.fn();
  const mockHandleGoBack = jest.fn();

  const renderComponent = (props: Partial<BottomButtonsProps> = {}) =>
    render(
      <I18nextProvider i18n={i18n}>
        <BottomButtons
          handleMainMenu={mockHandleMainMenu}
          handleGoBack={mockHandleGoBack}
          {...props}
        />
      </I18nextProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByText(i18n.t('selectOption'))).toBeInTheDocument();
  });

  it('displays the main menu and go back options with correct text', () => {
    renderComponent();
    expect(screen.getByText(i18n.t('mainMenu'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('goBack'))).toBeInTheDocument();
  });

  it('calls handleMainMenu when main menu row is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText(i18n.t('mainMenu')));
    expect(mockHandleMainMenu).toHaveBeenCalledTimes(1);
  });

  it('calls handleGoBack when go back row is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText(i18n.t('goBack')));
    expect(mockHandleGoBack).toHaveBeenCalledTimes(1);
  });

  it('handles errors when handleMainMenu fails', () => {
    const errorMock = jest.spyOn(console, 'error').mockImplementation();
    const handleMainMenuWithError = jest.fn(() => {
      throw new Error('Main menu error');
    });
    renderComponent({ handleMainMenu: handleMainMenuWithError });

    fireEvent.click(screen.getByText(i18n.t('mainMenu')));
    expect(errorMock).toHaveBeenCalledWith('Failed to navigate to main menu:', expect.any(Error));

    errorMock.mockRestore();
  });

  it('handles errors when handleGoBack fails', () => {
    const errorMock = jest.spyOn(console, 'error').mockImplementation();
    const handleGoBackWithError = jest.fn(() => {
      throw new Error('Go back error');
    });
    renderComponent({ handleGoBack: handleGoBackWithError });

    fireEvent.click(screen.getByText(i18n.t('goBack')));
    expect(errorMock).toHaveBeenCalledWith('Failed to go back:', expect.any(Error));

    errorMock.mockRestore();
  });

  it('displays an error alert when handleMainMenu throws an error', () => {
    window.alert = jest.fn();
    const handleMainMenuWithError = jest.fn(() => {
      throw new Error('Main menu error');
    });
    renderComponent({ handleMainMenu: handleMainMenuWithError });

    fireEvent.click(screen.getByText(i18n.t('mainMenu')));
    expect(window.alert).toHaveBeenCalledWith(i18n.t('error'));
  });

  it('displays an error alert when handleGoBack throws an error', () => {
    window.alert = jest.fn();
    const handleGoBackWithError = jest.fn(() => {
      throw new Error('Go back error');
    });
    renderComponent({ handleGoBack: handleGoBackWithError });

    fireEvent.click(screen.getByText(i18n.t('goBack')));
    expect(window.alert).toHaveBeenCalledWith(i18n.t('error'));
  });
});
