// Core
import React, { Component } from 'react';

export default class Entity extends Component {
    render() {
        const { entities, title } = this.props;

        const entitiesJSX = entities.map((entity) => (
            <li key = { entity.name }>
                <span>
                    <span>Name:</span> {entity.name}
                </span>
            </li>
        ));

        return (
            <section>
                <h1>{title}</h1>
                <ul>{entitiesJSX}</ul>
            </section>
        );
    }
}
