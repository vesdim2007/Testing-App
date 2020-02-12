import React from "react";
import { cleanup, getByTestId, fireEvent } from "@testing-library/react";
import expect from 'expect';
import Header from "../components/Header";
import renderWithi18next from "../renderWithI18n";

afterEach(cleanup);

describe("testing Header Component", () => {
  test("it should test lang", () => {
    const { container } = renderWithi18next(<Header />);
    expect(getByTestId(container, "text-trans")).toBeDefined();
    expect(getByTestId(container, "text-trans")).toHaveTextContent(
      "Welcome to Bet App"
    );
    fireEvent.click(getByTestId(container, "es-trans"));
    expect(getByTestId(container, "text-trans")).toHaveTextContent(
      "Bienvenidos a Bet App"
    );
  });
});