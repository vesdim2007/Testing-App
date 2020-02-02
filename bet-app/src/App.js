import React  from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import PublicRoute from "./router/Route"
import Sports from "./components/Sports"
import Events from "./components/Events"
import configureStore from './store/configureStore'
import './App.css';

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">          
          <Switch> 
            <PublicRoute exact path="/" component={Sports} />
            <PublicRoute path="/sports/:sport_id" component={Events} />
          </Switch>                   
          </div>         
        </Router>
      </Provider>         
  );
}

export default App;
