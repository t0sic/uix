import React, { Component } from 'react';

class Loading extends Component {
    render() { 

        const { style } = this.props

        return (  
            <div className="phone-loading" style={style}>
                <div className="loader">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                    <div className="bar4"></div>
                    <div className="bar5"></div>
                    <div className="bar6"></div>
                </div>
            </div>
        );
    }
}
 
export default Loading;