import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import ResourceCalendar from './pages/ResourceCalendar';
import Reservation from './pages/Reservation';
import Place from './pages/place';
import TypeofResource from './pages/typeofResource';
import Resource from './pages/Resource';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/resourceCalendar">
          <ResourceCalendar />
        </Route>
        <Route path="/resource">
          <Resource />
        </Route>
        <Route path="/typeofResource">
          <TypeofResource/>
        </Route>
        <Route path="/place">
          <Place/>
        </Route>
        <Route path="/Reservation">
          <Reservation />
        </Route>
      </Switch>
    </>
  );
}

export default App;
