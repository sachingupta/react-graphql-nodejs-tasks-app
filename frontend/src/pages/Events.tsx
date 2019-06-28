import React, { useState, useContext, useEffect } from 'react';
import './Events.css';
import '../index.css';
import { graphQLAPIUrl } from "../constants";
import { AuthContext } from "../context/auth-context";
import { Modal } from "../components/modal/modal";
import { Backdrop } from "../components/backdrop/backdrop";
import { EventList } from '../components/events/eventList/EventList';

export const EventsPage = (props: any) => {
    const authContext = useContext(AuthContext);

    const [events, setEvents] = useState([] as any);
    const [isLoading, setIsLoading] = useState(false);

    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);

    const startCreateEventHandler = () => {
        setCreating(true);
    }

    const onTitleChange = (e: any) => {
        setTitle(e.target.value);
    };

    const onPriceChange = (e: any) => {
        setPrice(+e.target.value);
    };

    const onDateChange = (e: any) => {
        setDate(e.target.value);
    };

    const onDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const modalCancelHandler = () => {
        setCreating(false);
    }

    const modalConfirmHandler = () => {
        if (title && description && date && price) {
            const event = { title, description, date, price };
            console.log(event);
            let requestBody = {
                query: `
            mutation {
                createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}" }) {
                    _id
                    title
                    price
                    description
                    date
                    creator {
                        _id
                        email
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
                    console.log(resData);
                    setEvents([...events, resData.data.createEvent]);
                })
                .catch(err => {
                    console.log(err);
                })
            setCreating(false);
        }
    }

    const fetchEvents = () => {
        setIsLoading(true);
        let requestBody = {
            query: `
            query {
                events {
                    _id
                    title
                    price
                    description
                    date
                    creator {
                        _id
                        email
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
                setEvents(resData.data.events);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <React.Fragment>
            {creating && <Backdrop />}
            {creating && <Modal title="Add Event" canCancel canConfirm onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
                <form className="event-form" onSubmit={modalConfirmHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={onTitleChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" onChange={onPriceChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" onChange={onDateChange} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea rows={4} id="description" onChange={onDescriptionChange} />
                    </div>
                </form>
            </Modal>}
            {authContext.token && <div className="events-control">
                <button className="button" type="button" onClick={startCreateEventHandler}>Create Event</button>
            </div>}
            
            { isLoading ? <p>Loading...</p>
            :  <EventList events={events} />
            }

        </React.Fragment>
    );
}
