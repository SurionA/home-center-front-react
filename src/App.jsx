import React from 'react';
import ChartContainer from './ChartContainer';
import RadianChartContainer from './RadianChartContainer';
import { MainTitle } from './HtmlElement';
import {
  MainBgColor,
  MainLightBgColor } from './Color';

const style = {
  flex: 1,
  alignItems: 'center',
  //  background: 'url(images/bg-dots-home.png) repeat,
  //  linear-gradient(to top, #242430 75%, #4d497d)',
  background: `linear-gradient(to top, ${MainBgColor} calc(100vh - 160px), ${MainLightBgColor})`,
  borderWidth: 1,
  flexDirection: 'column',
  minHeight: '100%',
  display: 'flex',
};

function App() {
  return (
    <div style={style}>
      <MainTitle>Home Monitor</MainTitle>
      <RadianChartContainer />
      <ChartContainer />
    </div>
  );
}

export default App;
