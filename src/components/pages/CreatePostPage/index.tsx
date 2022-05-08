import React, { ReactElement, useState, useEffect } from 'react';
import { useEnterSubmit, useInput, usePostRequest } from '../../../hooks';
import { useNavigate } from "react-router-dom";

export default function CreatePostPage(): ReactElement {
    const title = useInput('');
    const body = useInput('');
    const { data, loading, postRequest} = usePostRequest('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body
    });
    const onSubmit = () => {
        postRequest();
    }
    useEnterSubmit(onSubmit, title.value !== '' && body.value !== '', loading);

    const navigate = useNavigate();
    useEffect(() => {
        if(data) {
            navigate('timeline');
        }
    }, [data]);

    return (
        <form>
            <h1>Create a post</h1>
            <label>
                Title <input type="text" name="title" onChange={title.onChange} />
            </label>
            <label>
                Body <input type="text" name="body" onChange={body.onChange} />
            </label>
        </form>
    );
}
