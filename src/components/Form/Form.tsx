import React, { ReactElement, useState, useEffect } from 'react';
import { useEnterSubmit } from '../../hooks/useEnterSubmit';

export function hasInputValue(value: string) {
    return value.length > 0;
}

export function Form(): ReactElement {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLogin] = useState(false);

    const onSubmit = () => {
        setLogin(true);
    }

    const submitCondition: boolean = email !== '' && password !== '';
    useEnterSubmit({ onSubmit, submitCondition });

    const onChange = (value: string, setValue: Function) => {
        setValue(value);
    }

    if(loggedIn) {
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
                Email <input type="text" name="email" onChange={(e) => {
                    e.preventDefault();
                    onChange(e.target.value, setEmail);
                }} />
            </label>
            <label>
                Password <input type="password" name="password" onChange={(e) => {
                    e.preventDefault();
                    onChange(e.target.value, setPassword);
                }} />
            </label>
        </form>
    );
}
