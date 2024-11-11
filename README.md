# Stock Selection Chatbot

A simple, interactive chatbot built with **React** and **Tailwind CSS** that guides users through stock selection and displays stock prices in a conversational style.

## Features

- **Welcome Message**: Greets users with "Welcome to LSEG."
- **Stock Exchange Selection**: Users can choose from multiple stock exchanges.
- **Stock Options**: After selecting an exchange, users can pick specific stocks.
- **Stock Price Display**: Shows the selected stock’s price in the conversation.
- **Conversation Persistence**: User selections and options appear as sent messages.
- **Main Menu and Go Back**: Allows users to restart or revisit previous selections.

## How It Works

1. **User Journey**: 
   - Starts with a welcome message.
   - User picks a stock exchange and then selects a stock.
   - The chatbot displays the stock price with an option to return to the main menu or the previous selection.
2. **Non-Functional Message Options**: After selection, options become non-clickable, preserving the conversation flow.
3. **Data Storage**: All stock and exchange data are stored in a JSON file, allowing for easy updates.

## Technologies Used

- **React** for creating the user interface and components.
- **Tailwind CSS** for a responsive, utility-first styling approach.
- **TypeScript** for type safety, especially useful in maintaining code quality as the project grows.
- **Flowbite** for styled UI components, like tables and tooltips, that integrate well with Tailwind CSS.
- **Jest** and **React Testing Library** for testing components and user flows.

## Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
2. **Install Dependencies**
   ```bash
    npm install
3. **Run the App**
  
   ```bash
    npm start
4. **Run Tests**
   ```bash
    npm test