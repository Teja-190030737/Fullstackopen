import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignInContainer } from "./index";

describe("SignIn", () => {
    describe("SignInContainer", () => {
        it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
            const signIn = jest.fn();
            const { getByTestId } = render(<SignInContainer signIn={signIn} isTest />);

            fireEvent.changeText(getByTestId("username"), "kalle");
            fireEvent.changeText(getByTestId("password"), "password");
            fireEvent.press(getByTestId("submitButton"));

            await waitFor(() => {
                expect(signIn).toHaveBeenCalledTimes(1);
                expect(signIn.mock.calls[0][0]).toEqual({
                    username: "kalle",
                    password: "password"
                });
            });
        });
    });
});