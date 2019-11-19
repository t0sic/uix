import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { routes } from "./routes";
import Rendered from "../Components/Main/Rendered";

class Router extends Component {
    render() {

        const { $path } = this.props

        return (
            <BrowserRouter>
                <Rendered />
                <Redirect exact to={$path} />
                <div className="route-rendered">
                    {routes.map(({ path, Component }) => (
                        <Route key={path} path={path}>
                            <Route key={path} path={path}>
                                {() => <Component />}
                            </Route>
                        </Route>
                    ))}
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    $path: state.top.application.path
})

export default connect(mapStateToProps, {})(Router)
