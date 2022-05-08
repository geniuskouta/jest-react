// https://www.youtube.com/watch?v=hPOS6IRKJm0

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreatePostPage from '.';
import { BrowserRouter } from "react-router-dom";

interface InputElement extends HTMLElement {
    value?: string
}

const { getByLabelText, getByText } = screen;

describe("form test", () => {
    beforeEach(() => {
        cleanup();
        render(
            <BrowserRouter>
                <CreatePostPage />
            </BrowserRouter>
        );
    });

    it('title input should be empty', () => {
        const titleInputNode: InputElement = getByLabelText("Title");
        expect(titleInputNode.value).toBe('');
    });

    it('should render title input', () => {
        const titleInputNode: InputElement = getByLabelText("Title");
        expect(titleInputNode.getAttribute("name")).toBe("title");
    });


    it('form should accept enter submit if both title and body are filled', async () => {
        const titleInputNode: InputElement  = getByLabelText("Title");
        const bodyInputNode: InputElement  = getByLabelText("Body");
        fireEvent.change(titleInputNode, {
            target: { value: 'title' }
        });

        fireEvent.change(bodyInputNode, {
            target: { value: 'body' }
        });

        fireEvent.keyDown(window);

        // handle rerender by useEffect
        setTimeout(() => {
            const successScreen = getByText('logged in!');
            expect(successScreen).toBeInTheDocument();
        }, 3000);
    });
});
