import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { AuthPage } from './pages/Auth';
import { EventsPage } from './pages/Events';
import { BookingsPage } from './pages/Bookings';

class App extends React.Component<{}, {}> {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect from="/" to="/auth" exact />
                    <Route path="/auth" component={AuthPage} />
                    <Route path="/events" component={EventsPage} />
                    <Route path="/bookings" component={BookingsPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
