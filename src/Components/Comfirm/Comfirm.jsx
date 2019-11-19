import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import "./comfirm.css";

export class Comfirm extends Component {
    state = {
        hoveringYes: false,
        hoveringNo: false,
    }

    render() {

        const { comfirm } = this.props
        const { display, title, text, yes, no, source } = comfirm
        const noClasses = this.state.hoveringNo ? "glitch gl-1" : null
        const yesClasses = this.state.hoveringYes ? "glitch gl-1" : null

        return (
            <CSSTransition
                in={display}
                classNames="comfirm-dialog"
                timeout={400}
                unmountOnExit
            >
                <div className="comfirm">
                    <div className="comfirm-background" />
                    <div className="comfirm-container">
                        <div className="comfirm-title glitch gl-4">
                            <p>{title}</p>
                        </div>
                        <div className="comfirm-text glitch gl-4"><p data-text={text}>{text}</p></div>
                        <div className="comfirm-btns">
                            <button onMouseEnter={() => this.setState({ hoveringYes: true })} onMouseLeave={() => this.setState({ hoveringYes: false })} className="btn-main" onClick={() => window.emit("UIX_COMFIRM_DIALOG_CB", { data: true, source })}>
                                <div className={yesClasses}>
                                    <p data-text={yes}>{yes}</p>
                                </div>
                            </button>
                            <button onMouseEnter={() => this.setState({ hoveringNo: true })} onMouseLeave={() => this.setState({ hoveringNo: false })} className="btn-main" onClick={() => window.emit("UIX_COMFIRM_DIALOG_CB", { data: false, source })}>
                                <div className={noClasses}>
                                    <p data-text={no}>{no}</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }

}

const mapStateToProps = ({ top }) => ({
    comfirm: top.rendered.comfirm
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Comfirm)
