import React from 'react';
import {render} from 'react-dom';
import App from './App.jsx';
import TemperatureChart from './TemperatureChart.jsx';
import HumidityChart from './HumidityChart.jsx';

render(<App />, document.getElementById('app'));
render(<TemperatureChart />, document.getElementById('temperature-chart'));
render(<HumidityChart />, document.getElementById('humidity-chart'));
