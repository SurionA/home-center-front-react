import React from 'react';
import {Chart} from 'react-google-charts';
import {
  MainTextColor,
  BgChartColor,
  InsideLineColor,
  OutsideLineColor } from './Color.jsx';

let data = JSON.parse('[["14",100,"100%",38,"38%"],["15",98,"98%",38,"38%"],["16",98,"98%",38,"38%"],["17",99,"99%",39,"39%"],["18",99,"99%",39,"39%"],["19",99,"99%",39,"39%"],["20",99,"99%",43,"43%"],["21",99,"99%",44,"44%"],["22",99,"99%",44,"44%"],["23",100,"100%",44,"44%"],["00",100,"100%",44,"44%"],["01",99,"99%",45,"45%"],["02",99,"99%",45,"45%"],["03",99,"99%",44,"44%"],["04",99,"99%",44,"44%"],["05",99,"99%",44,"44%"],["06",99,"99%",44,"44%"],["07",99,"99%",44,"44%"],["08",99,"99%",43,"43%"],["09",98,"98%",45,"45%"],["10",96,"96%",44,"44%"],["11",93,"93%",44,"44%"],["12",93,"93%",44,"44%"],["13",94,"94%",44,"44%"]]');

class HumidityChart extends React.Component {
  constructor(props){
    super(props);
    this.chartEvents=[
      {
        eventName : 'select',
        callback  : function(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
            console.log("Selected ",Chart.chart.getSelection());
        }
      }
    ];
    this.state={
      options: {
        title: 'Daily Humidity',
        titleTextStyle: {
          color: MainTextColor
        },
        backgroundColor: {
          fill:BgChartColor
        },
        legend:{
          position: 'bottom',
          textStyle:{color: MainTextColor}
        },
        series: {
          0: { color: OutsideLineColor },
          1: { color: InsideLineColor }
        },
        hAxis: {textStyle:{color: MainTextColor}},
        vAxis: {minValue: 0, maxValue: 105, baselineColor: MainTextColor, gridlineColor: MainTextColor, textStyle:{color: MainTextColor}},
      },
      rows: data,
      columns: [
        {
          'type': 'string',
          'label' : 'Hours'
        },
        {
          'type' : 'number',
          'label' : 'Outside'
        },
        {
          'type': 'string',
          'role': 'tooltip'
        },
        {
          'type' : 'number',
          'label' : 'Inside'
        },
        {
          'type': 'string',
          'role': 'tooltip'
        }
      ]
    }
  }
  render() {
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
};
export default HumidityChart;
