import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "./router/Router";
import "../css/animations.css";

export class Screen extends Component {
    state = {
        keyNav: null
    }

    render() {
        return (
            <div className="screen">
                <Router setKeyNav={(keyNav) => this.setState({ keyNav })} />
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener("keyup", this.listner)
    }

    listner = ({ keyCode }) => {
        const { keyNav } = this.state

        switch (keyCode) {
            case 40:
                if (!keyNav) return
                keyNav.navigate("DOWN")
                // DOWN
                break;
            case 38:
                if (!keyNav) return
                keyNav.navigate("UP")
                // UP
                break;
            case 39:
                if (!keyNav) return
                keyNav.navigate("RIGHT")
                // RIGHT
                break;
            case 37:
                if (!keyNav) return
                keyNav.navigate("LEFT")
                // LEFT
                break;
            case 13:
                if (!keyNav) return
                keyNav.navigate("ENTER")
                // ENTER
                break;
            case 8:
                // BACKSPACE
                keyNav.navigate("BACKSPACE")
                break;
            default:
        }
    }

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
