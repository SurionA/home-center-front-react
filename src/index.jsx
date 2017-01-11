import React from 'react';
import { render } from 'react-dom';
import App from './App';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';

render(<App />, document.getElementById('app'));
render(<TemperatureChart />, document.getElementById('temperature-chart'));
render(<HumidityChart />, document.getElementById('humidity-chart'));
