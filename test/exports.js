import {expect} from 'chai'
import sinon  from "sinon"
import {createStore, applyMiddleware} from 'redux'
import {whitelist, blacklist} from "../lib"

describe("Exports", () => {
  it("should be able to export the two methods individually", () => {
    expect(whitelist).to.be.a('function')
    expect(blacklist).to.be.a('function')
  })
})
