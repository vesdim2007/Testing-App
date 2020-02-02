import React from 'react'
import {Route} from 'react-router-dom'

const PublicRoute = ({component: Component, ...rest}) => (
    <div>
    <Route 
      {...rest} 
      render={props => (
          <Component {...props} />
        ) 
      }
    />
    </div>
)

export default PublicRoute