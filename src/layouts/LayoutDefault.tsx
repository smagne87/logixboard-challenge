import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Shipments from 'views/shipments';
import Home from 'views/home';
import ShipmentsDates from 'views/dates';
import ShipmentsClients from 'views/clients';

import styles from './LayoutDefault.module.css';

export default function LayoutDefault(): JSX.Element {
  return (
    <div className="h-full overflow-x-hidden">
      <header className={styles.header}>
        <Link to="/home">Home</Link>
        <span className="mx-2">|</span>
        <Link to="/shipments">Shipments</Link>
      </header>
      <main className={styles.main}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/shipments" component={Shipments} />
          <Route path="/shipments-clients" component={ShipmentsClients} />
          <Route path="/shipments-dates" component={ShipmentsDates} />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </main>
    </div>
  );
}
