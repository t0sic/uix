import React, { Component } from "react";
import { connect } from "react-redux";
import "./Markers.css";
import Marker from "./Marker";

export class Markers extends Component {


    render() {

        const { markers } = this.props.markers

        return (
            <div className="markers-overlay">
                {markers.map((marker, i) => <Marker marker={marker} key={i} />)}
            </div>
        )
    }

}


const mapStateToProps = ({ top }) => ({
    markers: top.rendered.threeDMarker
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Markers)
