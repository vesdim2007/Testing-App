import axios from 'axios'

// Get All sports
export const getSports = () => {
    return async(dispatch) => {
        await axios.get(`/api/sports`)
        .then(res => {
            const {sports} = JSON.parse(res.data)
            sports.sort((a,b) => (a.pos > b.pos) ? 1 : ((b.pos > a.pos) ? -1 : 0));
            dispatch({type: "GET_SPORTS", payload: sports})
        })
        .catch(err => console.log(err))
    }
}



