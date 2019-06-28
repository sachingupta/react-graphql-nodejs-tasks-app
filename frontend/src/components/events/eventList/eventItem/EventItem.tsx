import React, { useContext } from 'react';
import './EventItem.css';
import { AuthContext } from '../../../../context/auth-context';

export const EventItem = (props: any) => {
    const authContext = useContext(AuthContext);
    const event = props.event;
    return (
        <li key={event.id} className="events_list-item">
            <div>
                <h1>{event.title}</h1>
                <h2>${event.price} - {new Date(event.date).toLocaleDateString('de-De')}</h2>
            </div>
            <div>
                {authContext.userId == event.creator._id ?
                    (<p>you are owner of this event</p>)
                    : (
                        <button>View detail </button>
                    )}
            </div>
        </li>
    );
}
