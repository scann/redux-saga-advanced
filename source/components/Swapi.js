// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

// Components
import Vehicles from './Vehicles';
import People from './People';
import Planets from './Planets';

// Instruments
import Styles from './styles.m.css';
import { swapiActions } from '../bus/swapi/actions';

const mapState = state => {
    return {
        vehicles: state.swapi.vehicles,
        people: state.swapi.people,
        planets: state.swapi.planets,
    };
};

const mapDispatch = {
    fetchVehiclesAsync: swapiActions.fetchVehiclesAsync,
    fetchPeopleAsync: swapiActions.fetchPeopleAsync,
    fetchPlanetsAsync: swapiActions.fetchPlanetsAsync,
    cancelFetch: swapiActions.cancelFetch,
    fetchAll: swapiActions.fetchAll,
};

@hot(module)
@connect(
    mapState,
    mapDispatch,
)
export default class Swapi extends Component {
    page = 1;

    _getNextPage = () => {
        const { fetchVehiclesAsync } = this.props;

        const currentPage = this.page;
        const nextPage = currentPage === 4 ? 1 : currentPage + 1;

        fetchVehiclesAsync(String(nextPage));

        this.page = nextPage;
    };

    _getPage = event => {
        const { fetchVehiclesAsync } = this.props;

        const pageToRequest = event.target.getAttribute('data-page');

        fetchVehiclesAsync(pageToRequest);
    };

    _getAll = () => {
        const currentPage = this.page;
        const nextPage = currentPage === 4 ? 1 : currentPage + 1;

        // this.props.fetchVehiclesAsync(nextPage);
        // this.props.fetchPeopleAsync(nextPage);
        // this.props.fetchPlanetsAsync(nextPage);
        this.props.fetchAll(nextPage);

        this.page = nextPage;
    };

    _cancelFetch = () => {
        this.props.cancelFetch();
    };

    render() {
        const { vehicles, people, planets } = this.props;

        return (
            <section className={Styles.swapi}>
                <h1>SWAPI</h1>
                <div className={Styles.getPages}>
                    <button data-page="1" onClick={this._getPage}>
                        Get page 1
                    </button>
                    <button data-page="2" onClick={this._getPage}>
                        Get page 2
                    </button>
                    <button data-page="3" onClick={this._getPage}>
                        Get page 3
                    </button>
                    <button data-page="4" onClick={this._getPage}>
                        Get page 4
                    </button>
                </div>
                <div className={Styles.getPrecise}>
                    <button
                        className={Styles.startFetch}
                        onClick={this._getNextPage}>
                        Get next vehicles page
                    </button>
                    <button
                        className={Styles.cancelFetch}
                        onClick={this._cancelFetch}>
                        Cancel
                    </button>
                    <button className={Styles.fetchAll} onClick={this._getAll}>
                        Get all next pages
                    </button>
                </div>
                <div className={Styles.lists}>
                    <Vehicles vehicles={vehicles} />
                    <People people={people} />
                    <Planets planets={planets} />
                </div>
            </section>
        );
    }
}
