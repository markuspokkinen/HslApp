import React, { Component } from 'react';

export default class OneItinerary extends Component {

    milliseconsToDate(time) {
        let d = new Date();
        d.setTime(time)
        //console.log(d);
        //console.log(d.toLocaleTimeString());
        return d.toLocaleTimeString()
    }

    render() {
        //console.log(this.props.Data)
        return(
            <div>
                {
                    this.props.Data.legs.map(value => {
                        console.log(value)
                        return (
                            < div style={{ display: "inline-block", padding: "5px" }} >
                                <p>Leave: {this.milliseconsToDate(value.startTime)}</p>
                                <p style={{ display: "inline-block", padding:"5px" }}>{value.mode} </p>
                                <p style={{ display: "inline-block", padding:"5px" }}>TO {value.to.name}</p>
                                <hr />
                            </div>
                                )
                    })
                
                }
                
        </div>
    )}

}