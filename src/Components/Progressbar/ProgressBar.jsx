import React, { Component } from "react";
import "./progressBar.css";
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            bar: null,
            interval: null,
            bars: []
        }
    }

    componentDidMount() {
        window.addEventListener("message", this.handleEvent)
    }

    handleEvent = (event) => {
        if (!event.data) return
        const { payload, type } = event.data
        if (type === "UIX_QUEUE_PROGRESSBAR") this.queueBar(payload)
        if (type === "UIX_REMOVE_PROGRESSBAR") this.removeBar(payload)
    }

    removeBar = (bar) => {
        if (this.state.bar === bar) {
            clearInterval(this.state.interval)
            this.setState({ bar: null }, () => {
                if (this.state.bars[0]) {
                    this.addBar(this.state.bars[0])
                }
            })
        } else {
            const bars = this.state.bars.filter((c) => c.id !== bar.id)
            this.setState({ bars })
        }
    }

    addBar = (bar) => {
        if (!bar.id === undefined) return
        this.setState({ bar }, () => {
            let ran = 0
            const interval = setInterval(() => {
                if ((((ran * 10) / bar.duration) * 100) >= 100) {
                    clearInterval(interval)
                    window.emit("UIX_PROGRESSBAR_DONE", bar)
                    const bars = this.state.bars.filter((c) => c.id !== bar.id)
                    this.setState({ bar: null, bars, percent: 0 }, () => {
                        if (this.state.bars[0]) {
                            this.addBar(this.state.bars[0])
                        }
                    })
                }
                this.setState({ percent: ((ran * 10) / bar.duration) * 100 })
                ran++
            }, 10)
            this.setState({ interval })
        })
    }

    queueBar = (bar) => {
        if (this.state.bar) {
            let bars = this.state.bars
            bars.push(bar)
            this.setState({ bars })
        } else {
            this.addBar(bar)
        }
    }

    render() {
        const { bar, percent } = this.state
        const duration = bar ? bar.duration : 1
        const display = bar ? "block" : "none"

        return (
            <div className="progrss-bar-overlay">
                <div className="progress-bar" style={{ display }}>
                    <CircularProgressbar
                        value={percent}
                        text={`${parseFloat(Math.round(((((100 - percent) / 100) * duration) / 1000) * 100) / 100).toFixed(1)}`}
                        strokeWidth={10}
                        background
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            pathTransitionDuration: 0,
                            pathColor: "white",
                            textColor: "white",
                            trailColor: "rgba(30, 30, 30, 0.5)",
                            backgroundColor: "rgba(30, 30, 30, 0.2)",
                            textSize: "150%"
                        })}
                    />
                    <div className="progress-bar-text">{this.state.bar ? bar.text : null}</div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;