import React from 'react';

import getHomeHydrometries from './homeapi';
import ChartRadian from './ChartRadian';

class RadianChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureContent: {
        label: 'N/A',
        val: null,
        startVal: 0,
        maxVal: 30,
        type: 'temperature',
      },
      humidityContent: {
        label: 'N/A',
        val: null,
        startVal: 0,
        maxVal: 100,
        type: 'humidity',
      },
    };
  }

  componentDidMount() {
    getHomeHydrometries().then((json) => {
      this.setState({
        temperatureContent: {
          label: `${json[0].inside_temperature}°`,
          val: `${json[0].inside_temperature}`,
          startVal: 0,
          maxVal: 30,
          type: 'temperature',
        },
        humidityContent: {
          label: `${json[0].inside_humidity}%`,
          val: `${json[0].inside_humidity}`,
          startVal: 0,
          maxVal: 100,
          type: 'humidity',
        },
      });
    });
  }

  render() {
    return (
      <div>
        <ChartRadian content={this.state.temperatureContent} />
        <ChartRadian content={this.state.humidityContent} />
      </div>
    );
  }
}

export default RadianChartContainer;
