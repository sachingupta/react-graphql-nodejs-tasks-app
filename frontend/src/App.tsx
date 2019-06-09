import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthPage } from './pages/Auth';
import { EventsPage } from './pages/Events';
import { BookingsPage } from './pages/Bookings';
import { MainNavigation } from "./components/navigation/MainNavigation";
import { AuthContext } from "./context/auth-context";

const App = (props: any) => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (token: any, userId: any, tokenExpiration: any) => {
        setUserId(userId);
        setToken(token);
    }

    const logout = () => {
        setUserId(null);
        setToken(null);
    }

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{ token: token, userId: userId, login: login, logout: logout }}>
                <MainNavigation />
                <main className="main-content">
                    <Switch>
                        {!token && <Route path="/auth" component={AuthPage} />}

                        {!token && <Redirect from="/" to="/auth" exact />}
                        {!token && <Redirect from="/bookings" to="/auth" exact />}

                        {token && <Redirect from="/" to="/events" exact />}
                        {token && <Redirect from="/auth" to="/events" exact />}
                        {token && <Route path="/bookings" component={BookingsPage} />}

                        <Route path="/events" component={EventsPage} />
                    </Switch>
                </main>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
