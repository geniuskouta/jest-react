// https://www.youtube.com/watch?v=hPOS6IRKJm0

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CreatePostPage, { hasInputValue } from '.';

interface InputElement extends HTMLElement {
    value?: string
}

describe("form test", () => {
    test('hasInputValue should fail if value is empty', () => {
        const text = "";
        expect(hasInputValue(text)).toBe(false);
    });

    test('should render email input', () => {
        const component = render(<CreatePostPage />);
        const emailInputNode = component.getByLabelText("Email");
        expect(emailInputNode.getAttribute("name")).toBe("email");
    });

    test('should render password input', () => {
        const component = render(<CreatePostPage />);
        const emailInputNode = component.getByLabelText("Password");
        expect(emailInputNode.getAttribute("name")).toBe("password");
    });

    test('hasInputValue should pass if value is there', () => {
        const text = "text@test.com";
        expect(hasInputValue(text)).toBe(true);
    });

    test('email input should accept text', () => {
        const { getByLabelText } = render(<CreatePostPage />);
        const emailInputNode: InputElement  = getByLabelText("Email");
        expect(emailInputNode.value).toMatch("");
        fireEvent.change(emailInputNode, {
            target: { value: 'test@test.com' }
        });
        expect(emailInputNode.value).toMatch("test@test.com");
    });

    test('form should accept enter submit if email and password are filled', async () => {
        const wrapper = render(<CreatePostPage />);
        const { getByLabelText, getByText } = wrapper;
        const emailInputNode: InputElement  = getByLabelText("Email");
        const passwordInputNode: InputElement  = getByLabelText("Password");
        fireEvent.change(emailInputNode, {
            target: { value: 'test@test.com' }
        });

        fireEvent.change(passwordInputNode, {
            target: { value: 'password' }
        });

        fireEvent.keyDown(window);

        // handle rerender by useEffect
        setTimeout(() => {
            const successScreen = getByText('logged in!');
            expect(successScreen).toBeInTheDocument();
        }, 3000);
    });
});
