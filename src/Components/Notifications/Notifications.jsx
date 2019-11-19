import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import "./notifications.css"
import { css } from 'glamor';

class Notifications extends Component {
    notify = () => toast(<div className="glitch gl-7">
        <p data-text="Hello" style={{ fontFamily: "Rubik" }}>Hello</p>
    </div>, {
        autoClose: 8000,
        closeButton: false,
        className: 'uix-notification',
        progressClassName: css({
            background: "rgba(42,148,165,1)",
        })
    });

    render() {
        return (
            <div className="notifications">
                <ToastContainer />
            </div>
        );
    }
}

export default Notifications;