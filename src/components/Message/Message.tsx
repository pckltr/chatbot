import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageProps } from '../../types/types';

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  const { t } = useTranslation();
  const isTextMessage = typeof text === 'string';

  if (!text) {
    console.error("Message text is missing.");
    return <div>{t('errorMessageLoading')}</div>;
  }

  return (
    <div
      className={`max-w-[80%] break-words ${
        isTextMessage
          ? isUser
            ? 'bg-blue-600 p-3 px-4 rounded-full text-white justify-self-end'
            : 'bg-gray-200 p-3 px-4 rounded-full text-black'
          : 'max-w-[80%] border-2'
      }`}
    >
      {text}
    </div>
  );
};

export default Message;
