import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { vi } from "vitest";

describe("App Component", () => {
  it("renders welcome message", () => {
    render(<App />);
    expect(
      screen.getByText("Hello! Welcome to LSEG. I'm here to help you.")
    ).toBeInTheDocument();
  });

  it("opens the chat and displays the main menu", () => {
    render(<App />);
    expect(screen.getByText("LSEG chatbot")).toBeInTheDocument();

    expect(
      screen.getByText("Please select a Stock Exchange.")
    ).toBeInTheDocument();
  });

  it("minimizes the chat window", () => {
    render(<App />);
    fireEvent.click(screen.getByTitle("Minimize"));
    fireEvent.click(screen.getByTitle("Maximize"));
    expect(screen.getByTitle("Minimize")).toBeInTheDocument();
  });

  it("handles user input and shows stock menu", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Please pick or type an option.");
    fireEvent.change(input, { target: { value: "Nasdaq" } });
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText("Alphabet Inc.")).toBeInTheDocument();
  });

  it("handles user click and shows stock menu", async () => {
    render(<App />);

    const textElement = screen.getByText("New York Stock Exchange");
    await userEvent.click(textElement);

    expect(screen.getByText("Ashland Inc.")).toBeInTheDocument();
  });

  it("handles user click and shows back menu", async () => {
    render(<App />);

    await userEvent.click(screen.getByText("New York Stock Exchange"));
    await userEvent.click(screen.getByText("Ashland Inc."));

    expect(
      screen.getByText(
        "Stock Price of Ashland Inc. is $93.42. Please select an option."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("downloads chat history", () => {
    const mockCreateObjectURL = vi.fn();
    const mockRevokeObjectURL = vi.fn();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    render(<App />);
    fireEvent.click(screen.getByTitle("Download History"));

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });
});
