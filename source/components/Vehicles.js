// Core
import React, { Component } from 'react';

export default class Vehicles extends Component {
    render() {
        const { vehicles } = this.props;

        const vehiclesJSX = vehicles.map((vehicle) => (
            <li key = { vehicle.name }>
                <span>
                    <span>Name:</span> {vehicle.name}
                </span>
            </li>
        ));

        return (
            <section>
                <h1>Vehicles</h1>
                <ul>{vehiclesJSX}</ul>
            </section>
        );
    }
}
