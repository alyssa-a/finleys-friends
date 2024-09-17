import { describe, it, expect, test, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const user = {
    name: "Bob",
    email: "bob@email.com"
};

describe("LoginForm", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should render", () => {
        render(
            <BrowserRouter>
                <LoginForm/>
            </BrowserRouter>
        );
    
        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument()
    
        const emailInput = screen.getByLabelText("Email");
        expect(emailInput).toBeInTheDocument()
    });

    it("should save user data in local storage", () => {
        
        render(
            <BrowserRouter>
                <LoginForm/>
            </BrowserRouter>
        );

        const nameInput = screen.getByLabelText("Name");
        const emailInput = screen.getByLabelText("Email");
        const submitButton = screen.getByRole('button');

        fireEvent.change(nameInput, { target: { value: "Bob" } });
        fireEvent.change(emailInput, { target: { value: "bob@email.com" } });
        fireEvent.click(submitButton);

        expect(localStorage.getItem("currentUser")).toBe("Bob");

        localStorage.clear();
    });
});