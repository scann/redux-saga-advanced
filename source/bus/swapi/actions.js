// Types
import { types } from './types';

export const swapiActions = {
    fetchAll: (page = '1') => ({
        type:    types.FETCH_ALL,
        payload: page,
    }),
    fetchVehiclesAsync: (page = '1') => ({
        type:    types.FETCH_VEHICLES_ASYNC,
        payload: page,
    }),
    fillVehicles: (vehicles) => ({
        type:    types.FILL_VEHICLES,
        payload: vehicles,
    }),
    fetchPeopleAsync: (page = '1') => ({
        type:    types.FETCH_PEOPLE_ASYNC,
        payload: page,
    }),
    fillPeople: (vehicles) => ({
        type:    types.FILL_PEOPLE,
        payload: vehicles,
    }),
    fetchPlanetsAsync: (page = '1') => ({
        type:    types.FETCH_PLANETS_ASYNC,
        payload: page,
    }),
    fillPlanets: (vehicles) => ({
        type:    types.FILL_PLANETS,
        payload: vehicles,
    }),
    cancelFetch: () => ({
        type: types.CANCEL_FETCH,
    }),
};
