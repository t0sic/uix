import React, { Component } from "react";
import { connect } from "react-redux";
import Comfirm from "../Comfirm/Comfirm";
import Markers from "../3DMarker/Markers";
import Hud from "../Hud/Hud";
import Notifications from "../Notifications/Notifications";
import Menus from "../Menus/Menus";
import Dialog from "../Dialog/Dialog";
import ProgressBar from "../Progressbar/ProgressBar";

export class Rendered extends Component {
    render() {

        return (
            <div className="rendered" style={{ position: "absolute" }}>
                <Comfirm />
                <Hud />
                <Dialog />
                <Markers />
                <Notifications />
                <Menus />
                <ProgressBar />
            </div>
        )
    }

}

const mapStateToProps = ({ top }) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Rendered)
