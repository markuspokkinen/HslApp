import React, { Component } from 'react';
import OneIt from './OneItinerary'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itineraries: []
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 60000);
        this.update();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    update() {
        let req = {
            url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
            method: 'POST',
            headers: { "Content-Type": "application/graphql" },
            body: `{
            plan(
                from:{lat:60.169369,lon:24.925819},
                to:{lat:60.159904,lon: 24.737772},
                numItineraries: 20,
            ){
            itineraries {
                walkDistance
                duration
                legs {
                    mode
                    startTime
                    endTime
                    duration
                    realTime
                    distance
                    from{
                        lat
                        lon
                        name
                        stop{
                            code
                             name
                        }
                    }
                    to{
                        lat
                        lon
                        name
                        stop{
                            code
                             name
                        }
                    }
            }
        }
        }
        }`

        }
        fetch(req.url, req).then(response => response.json()).then(response => {
            //console.log(response.data);
            this.setState({
                itineraries: response.data.plan.itineraries
            });
        });
    }
    render() {
        return (
            <div>
                <p>FROM: Efficode Headquarters TO: Iso Omena</p>
                <br />
                {
                    this.state.itineraries.map(value => < OneIt Data={value} />)
                }
            </div>
        );
    }
}
