import React, { useState, useContext } from 'react';
import './Auth.css';
import '../index.css';
import { graphQLAPIUrl } from "../constants";
import { AuthContext } from "../context/auth-context";

export const AuthPage = (props: any) => {
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const authContext = useContext(AuthContext);

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
            query LoginUser($email: String!, $password: String!){
                login(email: $email, password: $password) {
                    userId
                    token
                    tokenExpiration
                }
            }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        if (!isLogin) {
            requestBody = {
                query: `
            mutation CreateUser($email: String!, $password: String!) {
                createUser(userInput: { email: $email, password: $password}) {
                    _id
                    email
                }
            }
            `,
            variables: {
                email: email,
                password: password
            }
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
                if(resData.data.login.token) {
                    authContext.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
                }
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
