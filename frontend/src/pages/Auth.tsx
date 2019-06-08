import React, { useState } from 'react';
import './Auth.css';
import { graphQLAPIUrl } from "../constants";
export const AuthPage = (props: any) => {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const changeState = (e: any) => {
        setIsLogin(!isLogin);
    };

    const submitHanlder = (e: any) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        let requestBody = {
            query: `
            query {
                login(email: "${email}", password: "${password}") {
                    userId
                    token
                    tokenExpiration
                }
            }
            `
        };

        if (!isLogin) {
            requestBody = {
                query: `
            mutation {
                createUser(userInput: { email: "${email}", password: "${password}"}) {
                    _id
                    email
                }
            }
            `
            };
        }

        fetch(graphQLAPIUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <form className="auth-form" onSubmit={submitHanlder}>
            <div className="form-control">
                <label htmlFor="email">E-Mail </label>
                <input type="email" id="email" onChange={onEmailChange} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password </label>
                <input type="password" id="password" onChange={onPasswordChange} />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={changeState}> Switch to  {isLogin ? 'SignUp' : 'Login'} </button>
            </div>
        </form>
    );
}
