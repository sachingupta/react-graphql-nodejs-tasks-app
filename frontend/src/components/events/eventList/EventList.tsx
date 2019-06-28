import React from 'react';
import { EventItem } from './eventItem/EventItem';
import './EventList.css';

export const EventList = ({ events, onDetail }: any) => {
        return (
            <ul className="events_list">
            { events.map((event: any) => {
                return <EventItem onDetail={onDetail} event={event} />
            })}
        </ul>
        );
}
