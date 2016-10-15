import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

import fchanApi from './4chan_api';

import Catalog from './Catalog';

class App extends Component {

  constructor() {
    super();
    this.state = {threads: []}
    this.sorters = ["tim", "images", "no"].map((field) => {
      return {sorter: this.sorter(field).bind(this), name: field}
    });
  }

  componentDidMount() {
    fchanApi.getCatalog("b").done((threads) => this.setState({threads: threads}));
  }

  sorter(field) {
    return function() {
      var sorted = this.state.threads.sort((x, y) => {
        return x[field] > y[field] ? 1 : y[field] > x[field] ? -1 : 0;
      }).reverse();
      this.setState({threads: sorted});
    }
  }

  render() {
    return (
      <div className="App">
        <Catalog threads={this.state.threads} sorters={this.sorters} />
        <pre className="App-intro">
          {JSON.stringify(this.state.threads, null, "\t")}
        </pre>
      </div>
    );
  }
}

export default App;



