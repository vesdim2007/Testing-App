import React from 'react'
import {Route} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Header from "../components/Header"
import Spinner from "../components/Spinner/Spinner"

const PublicRoute = ({component: Component, ...rest}) => {
  const { t, i18n, ready } = useTranslation('translation', { useSuspense: false });
  return (
    <div>
      <Header />
      {!ready && <Spinner />}
      {ready && <Route 
        {...rest} 
        render={props => (
            <Component {...props} t={t} i18n={i18n}/>
          ) 
        }
      />}
    </div>
)

}

export default PublicRoute