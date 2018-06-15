// Instruments
import { types } from './types';

const initialState = {
    vehicles: [],
    people:   [],
    planets:  [],
};

export const swapiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_VEHICLES: {
            return {
                ...state,
                vehicles: action.payload,
            };
        }

        case types.FILL_PEOPLE: {
            return {
                ...state,
                people: action.payload,
            };
        }

        case types.FILL_PLANETS: {
            return {
                ...state,
                planets: action.payload,
            };
        }

        default:
            return state;
    }
};
