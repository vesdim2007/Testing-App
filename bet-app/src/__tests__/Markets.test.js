import React from "react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {saveMarkets}from '../actions/markets';
import reducer from '../reducers/markets';
import {marketsData} from "../fakeData"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMarkets Action Creator', () => {
    it('getMarkets Action Creator has correct type in its Action', () => {
    const action = saveMarkets();
    expect(action.type).toEqual("GET_MARKETS");
    });

    it('getMarkets Action Creator returns correct payload in its Action', () => {
    const action = saveMarkets(marketsData);
    expect(action.payload).toEqual(marketsData);
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
    const store = mockStore({ markets: [] });

    const expectedActions = [
        { type: "GET_MARKETS", payload: marketsData },
    ];

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
        status: 200,
        response: marketsData,
        });
        return store.dispatch(saveMarkets(request.response)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        })
    });
    });
});

describe('Markets Reducer', () => {
    it('should return the initial state', () => {
    expect(reducer(undefined, {markets: []})).toEqual({markets: []});
    });

    it('should handle GET_MARKETS', () => {
    const successAction = {
        type: "GET_MARKETS",
        payload: marketsData
    };
    expect(reducer({}, successAction)).toEqual({markets: marketsData});
    });
})






