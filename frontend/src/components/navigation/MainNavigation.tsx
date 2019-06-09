import React from 'react';
import { NavLink } from "react-router-dom";
import './MainNavigation.css';
import { AuthContext } from "../../context/auth-context";

export const MainNavigation = (props: any) => {
    return (
        <AuthContext.Consumer>
            { (context: any) =>
               ( <header className="main-navigation">
                    <div className="main-navigation_logo">
                        <h1> Easy Event </h1>
                    </div>
                    <nav className="main-navigation_item">
                        <ul>
                            {!context.token && <li>
                                <NavLink to="/auth">Login</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            {context.token && <li>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>}
                            {context.token && <li>
                                <button onClick={context.logout}>Logout</button>
                            </li>}
                        </ul>
                    </nav>
                </header>
    )}
        </ AuthContext.Consumer>
    );
};