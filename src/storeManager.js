import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Enables Redux Devtool in Chrome 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const staticReducers = {};
const createRootReducer = (asyncReducers = {}) => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
};

// Configure the store to dynamically add reducers
function configureStore(initialState = {}) {
  	const store = createStore(
	  	createRootReducer(),
	  	initialState,
	  	composeEnhancers(
            applyMiddleware(thunk),
        ),
	  );

  	// Add a dictionary to keep track of the registered async reducers
  	store.asyncReducers = {};

  	// Create and inject reducer function
  	// This function adds the async reducer, and creates a new combined reducer
  	store.injectReducer = (key, asyncReducer) => {
  		if (!store.asyncReducers[key]) {
  			store.asyncReducers[key] = asyncReducer;
    		store.replaceReducer(createRootReducer(store.asyncReducers));
  		}
  	}

  	// Return the modified store
  	return store
};

const store = configureStore(); // DO NOT MODIFY THIS DIRECTLY

// This should only be called ONE time in the entire App - Don't use this
export const getStore = () => store;
// This is only called in the reducer files, key must be unique
export const injectReducer = (key, reducer) => store.injectReducer(key, reducer)