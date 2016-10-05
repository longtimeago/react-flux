import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { combineReducers } from 'redux'

import {TOGGLE_ACTIVE, FILTER, FILTER_DETAILS, START_LOADING, STOP_LOADING, ADD_DATA, ADD_DATA_IN_DETAILS} from '../constants'

let gridState = {
        records:[],
        filtered: [],
        loading:false
    },
    detailsRecords = [];

export function grid(state = gridState, action){
    switch (action.type) {
        case TOGGLE_ACTIVE:
            let newRecords = [...state.records];
            newRecords[action.value].active = !newRecords[action.value].active;
            return Object.assign({}, state, {
                records: newRecords
            });
        case FILTER:
            let filteredRecordsInd = state.records
                .filter(r => !r.firstName.toUpperCase().includes(action.value.toUpperCase()))
                .map(r => r.id);
            return Object.assign({}, state, {
                filtered: filteredRecordsInd
            });
        case START_LOADING:
            return Object.assign({}, state, {loading: true});
        case STOP_LOADING:
            return Object.assign({}, state, {loading: false});
        case ADD_DATA:
            return Object.assign({}, state, {
                records:[...action.value]
            });
        default:
            return state
    }
}

export function details(state = detailsRecords, action){
    switch (action.type) {
        case ADD_DATA_IN_DETAILS:
            return action.value;
        case FILTER_DETAILS:
            return action.value ? state.filter((record)=>{
                return record.id == action.value;
            }) : state;
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    details,
    grid
});

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk
    )(createStore);
    return createStoreWithMiddleware(rootReducer);
}
