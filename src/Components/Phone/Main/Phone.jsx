import React, { Component } from "react";
import { connect } from "react-redux";
import StatusBar from "./StatusBar";
import Screen from "./Screen";
import "../css/index.css";
import "../css/phone.css";

class Phone extends Component {

    render() {

        const { phone } = this.props
        const { settings, general } = phone
        const { displayBackground, classes } = general
        const { background } = settings
        const { url } = background

        return (
            <div className={`phone-overlay ${classes}`}>
                <div className="phone">
                    <div className="phone-screen">
                        <div
                            className="phone-screen-background"
                            style={{
                                backgroundImage: `url(${url})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                display: displayBackground ? "block" : "none"
                            }}
                        />
                        <div className="phone-screen-inner">
                            <StatusBar />
                            <Screen />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({ phone }) => ({
    phone
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Phone)