import { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath } from "../../../../redux/actions/phoneActions";
import { CSSTransition } from "react-transition-group";
import React, { Component } from "react";
import KeyNav from "../../Main/KeyNav";
import { connect } from "react-redux";

export class Index extends Component {

    state = {
        actionBoxOpen: false,
        type: "portrait"
    }

    render() {
        const { actionBoxOpen, type } = this.state
        const { image, settings } = this.props
        const { link, action } = image
        const { label, icon } = action
        const { darkMode } = settings
        const color_t = darkMode ? "white" : "black"
        const color_p = darkMode ? "rgb(28, 28, 30)" : "rgb(242, 242, 247)"

        return (
            <div className="app" style={{color: color_t}}>
                <div className="image">
                    <div className="image-inner">
                        <div className={`image-${type}`} style={{background: `url(${link})`}} />
                    </div>
                </div>
                {
                    <CSSTransition
                        in={actionBoxOpen}
                        classNames="dialog-slide"
                        timeout={500}
                        appear={true}
                        unmountOnExit
                    >
                        <div className="image-action" style={{background: color_p}}>
                            <div className="image-action-label">{label}</div>
                            <div className="image-action-icon">
                                <i className={icon} />
                            </div>
                        </div> 
                    </CSSTransition>
                }
            </div>
        )
    }

    exited = () => { }

    enter = () => { 
        if (this.state.actionBoxOpen) {
            console.log("Perform Action")
        } else {
            this.setState({actionBoxOpen: true})
        }
    }

    quit = () => {
        const { UIXPhoneSetAnitmation, UIXPhoneSetAnimationDuration, UIXPhoneSetPath, image } = this.props
        UIXPhoneSetAnitmation("default")
        UIXPhoneSetAnimationDuration(200)
        UIXPhoneSetPath(image.quit)
    }

    backspace = () => {
        if (this.state.actionBoxOpen) {
            this.setState({actionBoxOpen: false})
        } else {
            this.quit()
        }
    }

    handleEvent = ({ detail }) => {
        if (detail.app !== "image") return
        if (!this[detail.action]) return
        this[detail.action]()
    }

    componentDidMount() { 
        window.addEventListener("phone", this.handleEvent) 
        const { image } = this.props
        const { link } = image

        let img = new Image()
        img.onload = () => {
            const imageIsLandscape = img.width > img.height
            const cameraType = imageIsLandscape ? "landscape" : "portrait"
            this.setState({ type: cameraType })
            console.log(cameraType)
        }
        img.src = link
    }

    entered = () => {
        const navigation = new KeyNav([], (event, data) => this[event](data))
        this.props.setKeyNav(navigation)
    }


}

const mapStateToProps = ({phone}) => ({
    image: phone.apps.image,
    settings: phone.settings
})

const mapDispatchToProps = {
    UIXPhoneSetAnimationDuration, 
    UIXPhoneSetAnitmation, 
    UIXPhoneSetPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
