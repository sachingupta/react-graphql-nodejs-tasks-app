import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import { graphQLAPIUrl } from '../constants';
import { AuthContext } from '../context/auth-context';

export const BookingsPage  = (props: any) => {
    const authContext = useContext(AuthContext);
    
    const [bookings, setBookings] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchBookings = () => {
        setIsLoading(true);
        let requestBody = {
            query: `
            query {
                bookings {
                    _id
                    createdAt
                    updatedAt
                    event {
                        _id
                        title
                        date
                    }
                }
            }
            `
        };

        fetch(graphQLAPIUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Berear ' + authContext.token
            }
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed');
                }
                return res.json();
            })
            .then(resData => {
                setBookings(resData.data.bookings);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <ul> 
           { bookings.map((booking: any) => <li> {booking.event.title} - {booking.createdAt}</li>)}
        </ul>
    );
}
