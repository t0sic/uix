import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

export class Transfer extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Transfer));
