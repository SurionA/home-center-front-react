import React from 'react';
import moment from 'moment';

import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import { MainTextColor } from './Color';

const labelStyle = {
  color: MainTextColor,
  fontWeight: 700,
};

const spanStyle = {
  paddingRight: 25,
};

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '1',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    alert(`Your favorite flavor is: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    const currentMonthDays = moment().format('DD');
    const threeMonthAgo = moment().subtract(3, 'months').format('YYYY-MM-01');
    const lastThreeMonthDays = moment().diff(moment(threeMonthAgo), 'days');
    const sixMonthAgo = moment().subtract(6, 'months').format('YYYY-MM-01');
    const lastSixMonthDays = moment().diff(moment(sixMonthAgo), 'days');

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label style={labelStyle}>
            <span style={spanStyle}>Period:</span>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="1">Today</option>
              <option value="7">Current week</option>
              <option value={currentMonthDays}>Current month</option>
              <option value={lastThreeMonthDays}>Last 3 months</option>
              <option value={lastSixMonthDays}>Last 6 months</option>
            </select>
          </label>
        </form>
        <TemperatureChart daysToShow={this.state.value} />
        <br />
        <HumidityChart daysToShow={this.state.value} />
      </div>
    );
  }
}

export default ChartContainer;
