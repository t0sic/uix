import React, { Component } from 'react';
import "./Markers.css";

class Marker extends Component {
    render() {

        const { marker } = this.props
        const { x, y, scale, text, effect } = marker

        return (
            <div className={`marker-main ${effect ? "marker-effect" : ""}`} style={{ marginTop: (y * 100) / 2 + "%", marginLeft: (x * 100) + "%", transform: `scale(${scale || 1}) rotate(45deg)`, position: "absolute" }}>
                <div className="marker-text">
                    <div className="market-text-inner">{text}</div>
                    <div className="marker-text-bar" />
                </div>
                <div className="marker marker-a">
                    <div className="marker-inner" />
                </div>
                <div className="marker marker-1">
                </div>
                <div className="marker marker-b">
                </div>
                <div className="marker marker-2" >
                </div >
                <div className="marker marker-3" >
                </div >
                <div className="marker marker-c">
                </div>
            </div >
        );
    }
}

export default Marker;