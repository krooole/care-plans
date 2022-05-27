import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'
import { CarePlanHome } from './components/CarePlanHome';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/careplans' component={CarePlanHome} />
      </Layout>
    );
  }
}
