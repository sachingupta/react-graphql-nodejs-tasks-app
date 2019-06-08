import React from 'react';
export const defaultAuthContextValue = {
    token: null,
    userId: null,
    login: (token: any, userId: any, tokenExpiration: any)  => {},
    logout: () =>{}
}

export const AuthContext = React.createContext(defaultAuthContextValue);

