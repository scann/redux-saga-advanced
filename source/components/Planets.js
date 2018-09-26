// Core
import React, { Component } from 'react';

export default class Planets extends Component {
    render() {
        const { planets } = this.props;

        const planetsJSX = planets.map((planet) => (
            <li key = { planet.name }>
                <span>
                    <span>Name:</span> {planet.name}
                </span>
            </li>
        ));

        return (
            <section>
                <h1>Planets</h1>
                <ul>{planetsJSX}</ul>
            </section>
        );
    }
}
