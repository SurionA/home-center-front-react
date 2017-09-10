import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';  
import logo from './logo.svg';
import './App.css';

import HelloWorld from './components/hello-world';
import HydrometriesList from './components/hydrometries/HydrometriesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <HelloWorld name='Kader'/>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="col-md-4">
            <HydrometriesList hydrometries={this.props.hydrometries} />
          </div>
      </div>
    );
  }
}

App.propTypes = {
  hydrometries: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    hydrometries: state.hydrometries
  };
} 

export default connect(mapStateToProps)(App); 