import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./bank.css";
import Dashboard from "./Dashboard";
import { UIXChangeLocation } from "../../redux/actions/actions";

class Bank extends Component {
    constructor(props) {
        super(props)

        this.state = {
            path: "dashboard"
        }
    }

    render() {

        const bankPaths = this.bankPaths()
        const route = this.route()

        return (
            <div className="bank-overlay">
                <div className="bank-background" />
                <div className="bank-main">

                    <div className="bank-navbar">
                        <div className="bank-name">Swe Bank</div>
                        <div className="bank-paths">{bankPaths}</div>
                    </div>

                    <div className="bank-body">
                        {route}
                    </div>

                </div>
            </div>
        );
    }

    componentDidMount() {
        window.emit("UIX_SET_NUIFOCUS", { cursor: true, focus: true })
        window.addEventListener("keyup", this.handleKeyup)
    }

    componentWillUnmount() {
        window.emit("UIX_SET_NUIFOCUS", { cursor: false, focus: false })
    }

    handleKeyup = ({ keyCode }) => {
        if (keyCode === 8 || keyCode === 27) this.props.UIXChangeLocation("")
    }

    bankPaths = () => {
        const paths = ["dashboard", "transactions", "send-money", "accounts"]
        const { t } = this.props
        let output = []

        paths.forEach((path, i) => {
            const className = (path === this.state.path) ? "highlighted" : ""
            output.push(<div key={i} onClick={() => this.setState({ path })} className={`bank-path ${className}`}>{t(`apps.bank.navbar.${path}`)}</div>)
        })

        return output
    }

    route = () => {
        const path = this.state.path
        switch (path) {
            case "dashboard":
                return <Dashboard />
            case "transactions":

                break;
            default:
                break;
        }
    }

}

const mapStateToProps = ({ top }) => ({
    player: top.player,
})

const mapDispatchToProps = {
    UIXChangeLocation
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Bank));

