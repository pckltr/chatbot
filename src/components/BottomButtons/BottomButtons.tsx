import React from 'react';
import { BottomButtonsProps } from '../../types/types';
import { useTranslation } from 'react-i18next';

const BottomButtons: React.FC<BottomButtonsProps> = ({ handleMainMenu, handleGoBack }) => {
  const { t } = useTranslation();

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-sm font-medium">{t('selectOption')}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() => {
              try {
                handleMainMenu();
              } catch (error) {
                console.error("Failed to navigate to main menu:", error);
                alert(t('error'));
              }
            }}
            className="cursor-pointer hover:bg-gray-100 text-center"
          >
            <td className="px-4 py-2">{t('mainMenu')}</td>
          </tr>
          <tr
            onClick={() => {
              try {
                handleGoBack();
              } catch (error) {
                console.error("Failed to go back:", error);
                alert(t('error'));
              }
            }}
            className="cursor-pointer hover:bg-gray-100 text-center"
          >
            <td className="px-4 py-2">{t('goBack')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BottomButtons;
