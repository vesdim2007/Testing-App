import React, { useEffect, useState, useRef }  from 'react';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getSports} from "../actions/sports"
import Spinner from "./Spinner/Spinner"

const Sports = (props) => {
    const {t} = props
    const {sports} = useSelector(state => state.sports)
    const dispatch = useDispatch();

    const [sportData, setSportData] = useState({
        sport_id: "",
        loading: false,
        sportsList: []
      });
    
    const { sportsList, sport_id, loading} = sportData;

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
            if(sports.length === 0) {
                dispatch(getSports())
                setSportData(() => ({...sportData, loading: true}))
            }
        }  

        if (sports && sports.length > 0) {
            setSportData(() => ({...sportData, loading: false, sportsList: sports}))
        } 
      }, [sportsList, sports, loading]);

      const renderSports = (sports) => {
          return sports.map(sport => (
            <div key={sport.id} className="sport">
                <div className="sport_column">
                    <p>{t('SPORT_NAME')}: <span style={{fontWeight: 700}}>{sport.desc} </span></p>
                </div>
                <div className="sport_column">
                    <p>{t('EVENTS')}: <span style={{fontWeight: 700}}>{sport.comp.length} </span></p>
                </div>
                <Link to={`/sports/${sport.id}`} className="btn">{t('ACTION')}</Link>
            </div>
            )
        )
    }

      return (
        <div className="sports">
            {loading && <Spinner/>}
            <h1> {t('ALL_SPORTS')}</h1>
            {sportsList.length > 0 && <>
            <h3>{t('SPORT_TITLE')}</h3>
            {renderSports(sportsList)}
            </>}
           
            {!loading && sportsList.length == 0 && <div>
                <h3>{t('NO_SPORTS')}</h3>
            </div>}
            
        </div>
        );
    
}

export default Sports



