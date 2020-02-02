import axios from 'axios'

// Get All Events
export const getEvents = (id) => {
    return async(dispatch) => {
        await axios.get(`/api/sports`)
        .then(res => {
            const {sports} = JSON.parse(res.data)
            const events = sports.filter(sport => sport.id == id)[0].comp
            dispatch({type: "GET_EVENTS", payload: events})
        })
        .catch(err => console.log(err))
    }
}

export default getEvents