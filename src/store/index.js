import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';
import { configureStore } from '@reduxjs/toolkit';

//либо вместо store можно записать ({dispatch, getState})
// const stringMiddleware = ({dispatch, getState}) => {
const stringMiddleware = (store) => {
// next это тот же dispatch, который обозначает функцию, которая вызовется в следующем миддлваре
    return (next) => {
        return (action) => {
            if (typeof action === 'string') {
                return next({
                    type: action
                })
            }
            return next(action)
        }
    }
}

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

// const store = createStore(
//     combineReducers({heroesReducer,filtersReducer}),
//     compose(
//         applyMiddleware(ReduxThunk,stringMiddleware),
//         compose(enhanser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
//     ),
// );

const store = configureStore({
    reducer: {
        heroesReducer,
        filtersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV != 'production',
})

export default store;