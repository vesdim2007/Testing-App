import React, { useEffect, useState, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import getEvents from "../actions/events"
import Spinner from "./Spinner/Spinner"
import { Link } from 'react-router-dom';

const Events = (props) => {
    const {t} = props

    const {events} = useSelector(state => state.events)
    const dispatch = useDispatch();

    const [sportData, setSportData] = useState({
        sport_id: "",
        loading: false,
        sport_events: []
      });
    
    const { sport_events, sport_id, loading} = sportData;

    const useIsMounted = () => {
        const isMounted = useRef(false);
        useEffect(() => {
          isMounted.current = true;
          return () => (isMounted.current = false);
        }, []);
        return isMounted;
      };

      const isMounted = useIsMounted();
     
      useEffect(() => {
        if (isMounted.current) {
            const { match } = props;  
            const id = match ? match.params.sport_id : null;
            if (id && events.length === 0) {
              dispatch(getEvents(id))
              setSportData(() => ({...sportData, loading: true, sport_id: id}))
            }
        }

        if (events.length > 0) {
            console.log(events)  
            setSportData(() => ({...sportData, loading: false, sport_events: events}))
        } 
      }, [sport_id, sport_events, loading, events]);

 return (
     <div>
         <h1>{t("ALL_EVENTS")} </h1>
         <div>
             {loading && <Spinner />}
             {sport_events.length > 0 &&<ul>
             { sport_events.map(event => (
                 <li key={event.id} className="sport">
                    <p>{event.desc}</p>
                    <Link to={`/sports/${sport_id}/events/${event.id}`} className="btn">{t('ACTION')}</Link>
                </li>
            ))}
             </ul>}
             {!loading && sport_events.length == 0 && <h3>{t("NO_EVENTS")}</h3>}
         </div>
     </div>
 )
}

export default Events
