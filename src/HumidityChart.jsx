import moment from 'moment';
import React from 'react';
import { Chart } from 'react-google-charts';
import getHomeHydrometries from './homeapi';
import {
  MainTextColor,
  BgChartColor,
  InsideLineColor,
  OutsideLineColor } from './Color';

class HumidityChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback: (element) => {
          console.log('Selected ', element.chart.getSelection());
        },
      },
    ];

    this.state = {
      options: {
        title: 'Daily Humidity',
        titleTextStyle: {
          color: MainTextColor,
        },
        backgroundColor: {
          fill: BgChartColor,
        },
        legend: {
          position: 'bottom',
          textStyle: { color: MainTextColor },
        },
        series: {
          0: { color: OutsideLineColor },
          1: { color: InsideLineColor },
        },
        hAxis: {
          titleTextStyle: { color: MainTextColor },
          textStyle: { color: MainTextColor },
        },
        vAxis: {
          viewWindowMode: 'explicit',
          viewWindow: { max: 100, min: 0 },
          baselineColor: MainTextColor,
          gridlineColor: MainTextColor,
          textStyle: { color: MainTextColor },
        },
        axes: {
          x: {
            0: {
              side: 'top',
              label: 'Percentage',
              textStyle: { color: MainTextColor },
            },
          },
        },
      },
      rows: false,
      columns: [
        {
          type: 'string',
          label: 'Hours',
        },
        {
          type: 'number',
          label: 'Outside',
        },
        {
          type: 'string',
          role: 'tooltip',
        },
        {
          type: 'number',
          label: 'Inside',
        },
        {
          type: 'string',
          role: 'tooltip',
        },
      ],
    };
  }

  componentDidMount() {
    getHomeHydrometries().then((json) => {
      json.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
      const humArray = [];
      json.forEach(hydrometry => humArray.push([`${moment(hydrometry.createdAt).format('HH')}h`, hydrometry.outside_humidity, `${hydrometry.outside_humidity}%`, hydrometry.inside_humidity, `${hydrometry.inside_humidity}%`]));
      this.setState({
        rows: humArray,
      });
    });
  }

  renderHumChart() {
    return (
      <Chart
        chartType="LineChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="HumidityChart"
        width="75vw"
        height="200px"
        chartEvents={this.chartEvents}
      />
    );
  }

  render() {
    const { rows } = this.state;
    if (rows) {
      return (this.renderHumChart());
    }
    return (<div />);
  }
}

export default HumidityChart;
