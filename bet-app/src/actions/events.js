import axios from 'axios'


export function saveEvents(events) {
    return {
      type: "GET_EVENTS",
      payload: events,
    };
  }

// Get All Events
export const getEvents = (id) => {
    return async(dispatch) => {
        await axios.get(`/api/sports`)
        .then(res => {
            const {sports} = JSON.parse(res.data)
            const events = sports.filter(sport => sport.id == id)[0].comp
            const ev_array = events.map(ev => ev.events).flat()
            ev_array.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0));
            dispatch(saveEvents(ev_array))
        })
        .catch(err => console.log(err))
    }
}

export default getEvents