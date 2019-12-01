import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "../css/statusbar.css";

export class StatusBar extends Component {
    render() {

        const { phone, t, time } = this.props
        const { general, settings, status } = phone
        const { battery } = status
        const { darkBackground, wifi, mobileData, showStatusBar } = general
        const { planeMode, wifiEnabled, mobileDataEnabled } = settings
        const style = { color: darkBackground ? "white" : "black" }
        const serviceConnectionStyles = { filter: darkBackground ? null : "invert(100%)" }
        const batteryBarStyle = { border: `1px solid ${darkBackground ? "white" : "black"}` }
        const batterBarFillerStyle = { background: darkBackground ? "white" : "black", width: battery + "%" }
        const statusBarStyles = { display: showStatusBar ? "block" : "none" }

        return (
            <div style={statusBarStyles} className="status-bar">
                <div className="status-bar-left">
                    {planeMode ?
                        <div className="status-bar-planemode">
                            <i className="fas fa-plane" style={style}></i>
                        </div> :
                        <Fragment>
                            <div className="status-bar-service-connection" style={serviceConnectionStyles} />
                            <div className="status-bar-service" style={style}>{t("apps.phone.statusbar.service-provider")}</div>
                            {wifi && wifiEnabled ?
                                <div className="status-bar-wifi">
                                    <i style={style} className="fas fa-wifi"></i>
                                </div> :
                                <Fragment>
                                    {mobileData && mobileDataEnabled ? <div className="status-bar-4g" style={style}>{t("apps.phone.statusbar.service")}</div> : null}
                                </Fragment>
                            }
                        </Fragment>
                    }
                </div>
                <div className="status-bar-middle">
                <div className="status-bar-time" style={style}>{time}</div>
                </div>
                <div className="status-bar-right">
                    <div style={batteryBarStyle} className="status-bar-battery-bar">
                        <div className="status-bar-battery-bar-filler">
                            <div style={batterBarFillerStyle} />
                        </div>
                    </div>
                    <div style={style} className="status-bar-battery-percent">{battery}%</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ phone, top }) => ({
    phone,
    time: top.world.time
})

const mapDispatchToProps = {

}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(StatusBar))
