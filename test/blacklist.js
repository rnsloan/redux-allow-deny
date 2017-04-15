import { expect } from "chai";
import sinon from "sinon";
import { createStore, applyMiddleware } from "redux";
import { blacklist } from "../src";

describe("Blacklist", () => {
  let store;
  let callback;

  beforeEach(() => {
    callback = sinon.spy();

    const blacklistMiddleware = blacklist(["ACTION_1", "ACTION_2"], callback);
    const createStoreWithMiddleware = applyMiddleware(blacklistMiddleware)(
      createStore
    );

    const initialState = { active: false };
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case "ACTION_1": {
          return Object.assign({}, state, {
            active: true
          });
        }
        case "ACTION_3": {
          return Object.assign({}, state, {
            active: true
          });
        }

        default: {
          return state;
        }
      }
    };

    store = createStoreWithMiddleware(reducer, initialState);
  });

  describe("Action called is not in the blacklist", () => {
    it("should not find the action in the list and therefore execute the callback", () => {
      expect(callback.called).to.be.false;
      store.dispatch({ type: "ACTION_3" });

      expect(callback.called).to.be.true;
    });

    it("should provide the callback with the expected arguments", () => {
      expect(callback.called).to.be.false;
      store.dispatch({ type: "ACTION_3", name: "Jake" });

      expect(callback.getCall(0).args[0]).to.deep.equal({
        type: "ACTION_3",
        name: "Jake"
      });
      expect(callback.getCall(0).args[1].getState).to.be.a("function");
      expect(callback.getCall(0).args[1].dispatch).to.be.a("function");
    });

    it("should provide the callback with the correct state", () => {
      expect(callback.called).to.be.false;
      expect(store.getState()).to.deep.equal({ active: false });

      store.dispatch({ type: "ACTION_3" });
      expect(callback.called).to.be.true;
      expect(store.getState()).to.deep.equal({ active: true });
    });
  });

  describe("Action called is in the blacklist", () => {
    it("should find the action in the list and therefore not execute the callback", () => {
      expect(callback.called).to.be.false;
      store.dispatch({ type: "ACTION_1" });
      expect(callback.called).to.be.false;
    });
  });
});
