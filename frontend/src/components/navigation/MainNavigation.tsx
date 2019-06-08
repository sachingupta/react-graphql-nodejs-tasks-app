import React from 'react';
import { NavLink } from "react-router-dom";
import './MainNavigation.css';

export const MainNavigation = (props: any) => {
    return (
        <header className="main-navigation">
            <div className="main-navigation_logo">
                <h1> Easy Event </h1>
            </div>
            <nav className="main-navigation_item">
                <ul>
                    <li>
                        <NavLink to="/auth">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bookings">Bookings</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};