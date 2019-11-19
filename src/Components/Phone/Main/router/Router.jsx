import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { routes } from "./routes";

export class Router extends Component {
    render() {

        const { general } = this.props
        const { path, appAnimation, appAnimationDuration } = general

        return (
            <Fragment>{
                routes.map((route, i) => {
                    const Component = route.Component
                    return (
                        <CSSTransition
                            key={i}
                            appear={true}
                            leave={!route.path === path}
                            in={route.path === path}
                            timeout={appAnimationDuration}
                            classNames={appAnimation}
                            unmountOnExit
                            onEntered={() => window.dispatchEvent(new CustomEvent("phone", { detail: { app: route.path, action: "entered" } }))}
                            onExited={() => window.dispatchEvent(new CustomEvent("phone", { detail: { app: route.path, action: "exited" } }))}
                        >
                            <Component setKeyNav={this.props.setKeyNav} />
                        </CSSTransition>
                    )
                })
            }
            </Fragment>
        )
    }
}

const mapStateToProps = ({ phone }) => ({
    general: phone.general
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
