import axios from 'axios'

// Get All Markets
export const getMarkets = (sport_id, event_id) => {
    return async(dispatch) => {
        await axios.get(`/api/sports`)
        .then(res => {
            const {sports} = JSON.parse(res.data)
            const events = sports.filter(sport => sport.id == sport_id)[0].comp
            
            const ev_array = events.map(ev => ev.events).flat()
            const markets = ev_array.filter(e => e.id == event_id)[0].markets
            
            dispatch({type: "GET_MARKETS", payload: markets})
        })
        .catch(err => console.log(err))
    }
}

export default getMarkets