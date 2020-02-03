import React, { useEffect, useState, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import getMarkets from "../actions/markets"
import Spinner from "./Spinner/Spinner"
import { Link } from 'react-router-dom';

const Markets = (props) => {

    const {markets} = useSelector(state => state.markets)
    const dispatch = useDispatch();

    const [eventData, setEventData] = useState({
        event_id: "",
        sport_id: "",
        loading: false,
        event_markets: []
      });
    
    const { event_markets, sport_id, event_id, loading} = eventData;

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
            const eid = match ? match.params.event_id : null;
            const sid = match ? match.params.sport_id : null;
            if (eid && sid && markets.length === 0) {
            dispatch(getMarkets(sid, eid))
            setEventData(() => ({...eventData, loading: true, sport_id:sid, event_id: eid}))
            }  
        }

        if (markets && markets.length > 0) {
                
            setEventData(() => ({...eventData, loading: false, event_markets: markets}))
        } 
      }, [event_id, event_markets, sport_id, markets, loading]);

    console.log(event_markets)

 return (
     <div>
         <h1>All Markets </h1>
         {loading && <Spinner />}
         <ul>
         {event_markets.length > 0 && event_markets.map(market => (
             <li key={market.id} className="sport">
                 <p>{market.desc}</p>
                {market.o.map(o => (<p key={o.oid}>{o.d}</p>))}
             </li>
         ))}
         </ul>
     </div>
 )
}

export default Markets