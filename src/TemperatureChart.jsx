import React from 'react';
import {Chart} from 'react-google-charts';
import {
  MainTextColor,
  BgChartColor,
  InsideLineColor,
  OutsideLineColor } from './Color.jsx';
let data = JSON.parse('[["14",4,"4C",19,"19C"],["15",5,"5C",19,"19C"],["16",4,"4C",19,"19C"],["17",4,"4C",19,"19C"],["18",3,"3C",19,"19C"],["19",3,"3C",19,"19C"],["20",3,"3C",19,"19C"],["21",2,"2C",20,"20C"],["22",3,"3C",20,"20C"],["23",0,"0C",19,"19C"],["00",1,"1C",19,"19C"],["01",3,"3C",18,"18C"],["02",3,"3C",18,"18C"],["03",3,"3C",18,"18C"],["04",3,"3C",18,"18C"],["05",3,"3C",18,"18C"],["06",3,"3C",18,"18C"],["07",3,"3C",18,"18C"],["08",3,"3C",19,"19C"],["09",3,"3C",18,"18C"],["10",4,"4C",18,"18C"],["11",5,"5C",18,"18C"],["12",5,"5C",18,"18C"],["13",6,"6C",18,"18C"]]');

class TemperatureChart extends React.Component {
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
        title: 'Daily Temperatures',
        titleTextStyle: {
          color: MainTextColor
        },
        backgroundColor: {
          fill: BgChartColor
        },
        legend:{
          position: 'bottom',
          textStyle:{color: MainTextColor}
        },
        series: {
          0: { color: OutsideLineColor },
          1: { color: InsideLineColor }
        },
        hAxis: {titleTextStyle: {color: MainTextColor}, titleTextStyle: {color: MainTextColor}, textStyle:{color: MainTextColor}},
        vAxis: {minValue: -10, baselineColor: MainTextColor, gridlineColor: MainTextColor, textStyle:{color: MainTextColor}},
        axes: {
            x: {
              0: { side: 'top', label: 'Percentage', textStyle:{color: MainTextColor}} // Top x-axis.
            }
          },
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
        graph_id="TemperatureChart"
        width="75vw"
        height="200px"
        chartEvents={this.chartEvents}
       />
    );
  }
};
export default TemperatureChart;
