import {expect} from 'chai';
import sinon  from "sinon";
import {createStore, applyMiddleware} from 'redux';
import bw from "../lib";

describe("Blacklist", function () {

  let store;
  let callback;

  beforeEach(() => {
    callback = sinon.spy();

    const blacklist = bw.blacklist(['ACTION_1', 'ACTION_2'], callback);
    const createStoreWithMiddleware = applyMiddleware(blacklist)(createStore);

    const initialState = { active: false };
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case 'ACTION_1': {
          return Object.assign({}, state, {
            active: true
          });
        }
        case 'ACTION_3': {
          return state;
        }

        default: {
          return state;
        }
      }
    }

    store = createStoreWithMiddleware(reducer, initialState);
  });


  it("should not find the action in the list and therefore execute the callback", function () {
    expect(callback.called).to.be.false;
    store.dispatch({type: 'ACTION_3'});
    expect(callback.called).to.be.true;
  })

  it("should find the action in the list and therefore not execute the callback", function () {
    expect(callback.called).to.be.false;
    store.dispatch({type: 'ACTION_1'});
    expect(callback.called).to.be.false;
  })
});

