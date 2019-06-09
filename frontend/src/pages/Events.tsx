import React, { useState, useContext } from 'react';
import './Events.css';
import '../index.css';
import { graphQLAPIUrl } from "../constants";
import { AuthContext } from "../context/auth-context";
import { Modal } from "../components/modal/modal";
import { Backdrop } from "../components/backdrop/backdrop";

export const EventsPage = (props: any) => {
    const [creating, setCreating] = useState(false);


    const authContext = useContext(AuthContext);

    const startCreateEventHandler = () => {
        setCreating(true);
    }

    const modalCancelHandler = () => {
        setCreating(false);
    }

    const modalConfirmHandler = () => {
        setCreating(false);
    }


    return (
        <React.Fragment>
            {creating && <Backdrop />}
            {creating && <Modal title="Add Event" canCancel canConfirm onCancel={modalCancelHandler} onConfirm={modalConfirmHandler}>
                <p>modal content</p>
            </Modal>}
            <div className="events-control">
                <button className="button" type="button" onClick={startCreateEventHandler}>Create Event</button>
            </div>
        </React.Fragment>
    );
}

