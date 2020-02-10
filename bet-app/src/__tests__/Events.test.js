import React from "react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import {saveEvents}from '../actions/events';
import reducer from '../reducers/events';
import {eventsData} from "../fakeData"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getEvents Action Creator', () => {
    it('getEvents Action Creator has correct type in its Action', () => {
    const action = saveEvents();
    expect(action.type).toEqual("GET_EVENTS");
    });

    it('getEvents Action Creator returns correct payload in its Action', () => {
    const action = saveEvents(eventsData);
    expect(action.payload).toEqual(eventsData);
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
    const store = mockStore({ events: [] });

    const expectedActions = [
        { type: "GET_EVENTS", payload: eventsData },
    ];

    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
        status: 200,
        response: eventsData,
        });
        return store.dispatch(saveEvents(request.response)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        })
    });
    });
});

describe('Events Reducer', () => {
    it('should return the initial state', () => {
    expect(reducer(undefined, {events: []})).toEqual({events: []});
    });

    it('should handle GET_EVENTS', () => {
    const successAction = {
        type: "GET_EVENTS",
        payload: eventsData
    };
    expect(reducer({}, successAction)).toEqual({events: eventsData});
    });
})






