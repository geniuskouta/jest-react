import React, { ReactElement, useState, useEffect } from 'react';
import usePostRequest from 'src/hooks/usePostRequest';
import { useEnterSubmit, useInput } from '../../../hooks';

export function hasInputValue(value: string) {
    return value.length > 0;
}

export default function Form(): ReactElement {
    const [loggedIn, setLogin] = useState(false);

    const title = useInput('');
    const body = useInput('');
    const { loading, postRequest} = usePostRequest('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body
    });
    const onSubmit = () => {
        postRequest().then(() => setLogin(true));
    }
    useEnterSubmit(onSubmit, title.value !== '' && body.value !== '', loading);

    if (loggedIn) {
        return (
            <div>
                logged in!
            </div>
        );
    }

    return (
        <form>
            <div>Enter to submit</div>
            <label>
                Title <input type="text" name="title" onChange={title.onChange} />
            </label>
            <label>
                Body <input type="text" name="body" onChange={body.onChange} />
            </label>
        </form>
    );
}
