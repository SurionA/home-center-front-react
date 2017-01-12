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
      daysToShow: this.props.daysToShow,
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
      json.forEach((hydrometry) => {
        const dateLabel = `${moment(hydrometry.createdAt).format('DD/MM')} at ${moment(hydrometry.createdAt).format('HH')}h`;
        const xDateLabel = `${moment(hydrometry.createdAt).format('HH')}h`;
        humArray.push([`${xDateLabel}`, hydrometry.outside_humidity, `${dateLabel} \n ${hydrometry.outside_humidity}%`, hydrometry.inside_humidity, `${dateLabel} \n ${hydrometry.inside_humidity}%`]);
      });
      this.setState({
        rows: humArray,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.daysToShow !== this.state.daysToShow) {
      this.setState({ daysToShow: nextProps.daysToShow });
      getHomeHydrometries(nextProps.daysToShow).then((json) => {
        json.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
        const humArray = [];
        json.forEach((hydrometry) => {
          const dateLabel = `${moment(hydrometry.createdAt).format('DD/MM')} at ${moment(hydrometry.createdAt).format('HH')}h`;
          const xDateLabel = `${moment(hydrometry.createdAt).format('HH')}h`;
          humArray.push([`${xDateLabel}`, hydrometry.outside_humidity, `${dateLabel} \n ${hydrometry.outside_humidity}%`, hydrometry.inside_humidity, `${dateLabel} \n ${hydrometry.inside_humidity}%`]);
        });
        this.setState({
          rows: humArray,
        });
      });
    }
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

HumidityChart.propTypes = {
  daysToShow: React.PropTypes.string,
};

HumidityChart.defaultProps = {
  daysToShow: 1,
};

export default HumidityChart;
