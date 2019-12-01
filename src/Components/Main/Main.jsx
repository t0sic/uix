import React, { Component } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import EventListner from "./EventListner";
import Router from "../../routes/Router";
import store from "../../redux/store";
import i18n from "../../i18/";
import Time from "./Time";


export class Main extends Component {

    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <div className="top">
                        <EventListner />
                        <Router />
                        <Time />
                    </div>
                </Provider>
            </I18nextProvider>
        )
    }

    componentWillMount() {
        window.emit = (event, data) => {
            console.log("Emitting event: " + event + ", with data: " + JSON.stringify(data))
            const options = {
                method: "POST",
                body: JSON.stringify({ event, data })
            }

            fetch("http://uix/nui_client_response", options)
        }
    }

}


export default Main
