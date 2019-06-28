import React, { useContext } from 'react';
import './EventItem.css';
import { AuthContext } from '../../../../context/auth-context';

export const EventItem = (props: any) => {
    const authContext = useContext(AuthContext);
    const event = props.event;
    const onDetail = () => {
        props.onDetail(event._id);
    }
    return (
        <li key={event._id} className="events_list-item">
            <div>
                <h1>{event.title}</h1>
                <h2>${event.price} - {new Date(event.date).toLocaleDateString('de-De')}</h2>
            </div>
            <div>
                {authContext.userId == event.creator._id ?
                    (<p>you are owner of this event</p>)
                    : (
                        <button onClick={onDetail}>View detail </button>
                    )}
            </div>
        </li>
    );
}
