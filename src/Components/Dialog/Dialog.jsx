import { CSSTransition } from "react-transition-group"
import React, { Component } from "react"
import { connect } from "react-redux"
import "./dialog.css"

export class Dialog extends Component {
    state = {
        input: ""
    }

    render() {
        const { dialog } = this.props
        const { display, header, source } = dialog
        const { input } = this.state

        return (
            <CSSTransition
                in={display}
                classNames="comfirm-dialog"
                timeout={400}
                unmountOnExit
            >
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-header">{header}</div>
                        <div className="dialog-input-container">
                            <input
                                onChange={({ target }) =>
                                    this.setState({ input: target.value })
                                }
                                value={input}
                            />
                        </div>
                        <div className="dialog-buttons">
                            <div>
                                <button
                                    onClick={() =>
                                        window.emit("UIX_DIALOG_CB", {
                                            source,
                                            accept: true,
                                            input: input
                                        })
                                    }
                                >
                                    Accept
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() =>
                                        window.emit("UIX_DIALOG_CB", {
                                            source,
                                            accept: false,
                                            input: input
                                        })
                                    }
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

const mapStateToProps = ({ top }) => ({
    dialog: top.rendered.dialog
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
