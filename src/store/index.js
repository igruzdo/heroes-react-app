import { combineReducers, createStore, compose } from 'redux';
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';

const enhanser = (createStore) => (...args) => {
    const store = createStore(...args)

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store;
}

const store = createStore(
    combineReducers({heroesReducer,filtersReducer}), 
    compose(enhanser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

export default store;