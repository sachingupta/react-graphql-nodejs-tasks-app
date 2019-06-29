import React from 'react';
import './BookingList.css';
import { BookingItem } from './bookingItem/BookingItem';

export const BookingList = ({ bookings, onCancel }: any) => {
    return (
        <ul className="bookings_list">
            {bookings.map((booking: any) =>
                <BookingItem booking={booking} onCancel={onCancel} />
            )}
        </ul>
    );
}
