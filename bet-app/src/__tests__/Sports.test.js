import React from "react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {saveSports}from '../actions/sports';
import reducer from '../reducers/sports';
import {sportsData} from "../fakeData"

// const sportsData = [{"id": 1, "desc": "Football", "comp": [0, 1, 2]}, {"id": 2, "desc": "Tennis", "comp": [0, 1, 2]}]

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getSports Action Creator', () => {
  it('getSports Action Creator has correct type in its Action', () => {
    const action = saveSports();
    expect(action.type).toEqual("GET_SPORTS");
  });

  it('getSports Action Creator returns correct payload in its Action', () => {
    const action = saveSports(sportsData);
    expect(action.payload).toEqual(sportsData);
  });
});

describe('Redux-Thunk working properly, dispatch returns associated Action Creators to ensure axios API call succesfully pulling data', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests', () => {
    const store = mockStore({ sports: [] });

    const expectedActions = [
      { type: "GET_SPORTS", payload: sportsData },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sportsData,
      });
      return store.dispatch(saveSports(request.response)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
    });
  });
});

describe('Sport Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {sports: []})).toEqual({sports: []});
  });

  it('should handle GET_SPORTS', () => {
    const successAction = {
      type: "GET_SPORTS",
      payload: sportsData
    };
    expect(reducer({}, successAction)).toEqual({sports: sportsData});
  });
})






