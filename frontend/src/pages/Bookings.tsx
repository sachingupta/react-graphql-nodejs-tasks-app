import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import { graphQLAPIUrl } from '../constants';
import { AuthContext } from '../context/auth-context';
import { BookingList } from '../components/bookings/bookingList/BookingList';

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
                    user {
                        _id
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

    const onCancelBooking = (bookingId: any) => {
        setIsLoading(true);
        let requestBody = {
            query: `
            mutation CancelBooking($id:ID!) {
                cancelBooking(bookingId: $id) {
                    _id
                    title
                }
            }
            `,
            variables: {
                id: bookingId
            }
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
                const updatedBookings = bookings.filter((booking: any) => {
                    return booking._id != bookingId;
                });
                setBookings(updatedBookings);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }


    return (
           <BookingList bookings={bookings} onCancel={onCancelBooking}/>
    );
}
