import React, { useContext } from 'react';
import './BookingItem.css';
import { AuthContext } from '../../../../context/auth-context';

export const BookingItem = ({booking, onCancel }: any) => {
    const authContext = useContext(AuthContext);
    const onCancelBooking = () => {
        if(booking) {
        onCancel(booking._id);
        }
    }
    return (
        <li key={booking._id} className="bookings_list-item">
            <div>
            {booking.event.title} - {new Date(booking.createdAt).toLocaleDateString('de-De')}
            </div>
            <div>
                {authContext.userId == booking.user._id ?
                    ( <button onClick={onCancelBooking}>Cancel</button>)
                    : (
                        <p>you haven't book this event</p>
                    )}
            </div>
        </li>
    );
}
