// Core
import React, { Component } from 'react';

export default class People extends Component {
    render() {
        const { people } = this.props;

        const peopleJSX = people.map((human) => (
            <li key = { human.name }>
                <span>
                    <span>Name:</span> {human.name}
                </span>
            </li>
        ));

        return (
            <section>
                <h1>People</h1>
                <ul>{peopleJSX}</ul>
            </section>
        );
    }
}
