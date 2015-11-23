# redux-white-black

Redux middleware to execute a callback on action types using a whitelist or blacklist approach

## Installation

`npm install --save redux-white-black`

## Usage

Both the whitelist and blacklist methods expect two parameters: 

1. `Actions` (*array*) array of action types (*string*) to check against
2. `callback` (*function*)

The `callback` is passed two parameters:

1. `Action` (*object*) the current action
2. `state` (*object*) the state object with the methods `getState` and `dispatch`

### Example

Note: recommended to move the middleware creation into a separate file  

```
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as reducers from '../reducers'
import bw from 'redux-white-black'
import {
  CREATE_SHORTLIST,
  EDIT_SHORTLIST,
} from '../constants'

const reducer = combineReducers(reducers)

//the callback function passed action and state
function logShortlistActions(action, state) {
  console.log(`ACTION: ${action.type}`)    
}

//create middleware to execute the callback if an Action has type 'CREATE_SHORTLIST' or 'EDIT_SHORTLIST'
const whitelist = bw.whitelist([CREATE_SHORTLIST, EDIT_SHORTLIST], logShortlistActions)

// standard redux boilerplate:
const createStoreWithMiddleware = compose(
  applyMiddleware(whitelist)
)(createStore)


export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
```

Blacklist method works exactly the same

```
const blacklist = bw.blacklist([CREATE_SHORTLIST, EDIT_SHORTLIST], logActionIfNotShortlist)
```


The methods can be exported individually:

```
import {whitelist} from "redux-white-black"

const whitelistMiddleware = whitelist([ACTION_1, ACTION_2], callback)
```

### Credit

Inspired by this middleware: [github.com/michaelcontento/redux-storage](https://github.com/michaelcontento/redux-storage)