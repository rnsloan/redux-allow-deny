# redux-allow-deny

Redux middleware to execute a callback on action types using a allowlist or denylist approach

## Installation

`npm install --save redux-allow-deny`

## Usage

Both the allowlist and denylist methods expect two parameters:

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
import * as wb from 'redux-allow-deny'
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
const allowlist = wb.allowlist([CREATE_SHORTLIST, EDIT_SHORTLIST], logShortlistActions)

// standard redux boilerplate:
const createStoreWithMiddleware = compose(
  applyMiddleware(allowlist)
)(createStore)


export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
```

denylist method works exactly the same

```
const denylist = wb.denylist([CREATE_SHORTLIST, EDIT_SHORTLIST], logActionIfNotShortlist)
```


The methods can be exported individually:

```
import {allowlist} from "redux-allow-deny"

const allowlistMiddleware = allowlist([ACTION_1, ACTION_2], callback)
```

## Credit

Inspired by: [github.com/michaelcontento/redux-storage](https://github.com/michaelcontento/redux-storage)
