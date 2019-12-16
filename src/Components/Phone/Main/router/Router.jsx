import { CSSTransition } from "react-transition-group"
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { routes } from "./routes"

export class Router extends Component {
    render() {
        const { general } = this.props
        const { path, appAnimation, appAnimationDuration } = general

        return (
            <Fragment>
                {routes.map((route, i) => {
                    const Component = route.Component
                    return (
                        <CSSTransition
                            onEntered={() =>
                                window.dispatchEvent(
                                    new CustomEvent("phone", {
                                        detail: {
                                            app: route.path,
                                            action: "entered"
                                        }
                                    })
                                )
                            }
                            onExited={() =>
                                window.dispatchEvent(
                                    new CustomEvent("phone", {
                                        detail: {
                                            app: route.path,
                                            action: "exited"
                                        }
                                    })
                                )
                            }
                            timeout={appAnimationDuration}
                            leave={!route.path === path}
                            classNames={appAnimation}
                            in={route.path === path}
                            unmountOnExit
                            appear={true}
                            key={i}
                        >
                            <Component
                                keyNav={this.props.keyNav}
                                setKeyNav={this.props.setKeyNav}
                            />
                        </CSSTransition>
                    )
                })}
            </Fragment>
        )
    }
}

const mapStateToProps = ({ phone }) => ({
    general: phone.general
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
