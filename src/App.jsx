import React from 'react';
import { MainTitle} from './HtmlElement.jsx';
import {
  MainTextColor,
  MainBgColor,
  MainLightBgColor } from './Color.jsx';

class App extends React.Component {

  render () {
    return <div style={App.style}>
      <MainTitle>Home Monitor</MainTitle>
      <div id="temperature-chart" />
      <br />
      <div id="humidity-chart" />
    </div>;
  }
}

App.style = {
  flex: 1,
  alignItems: 'center',
  //background: 'url(images/bg-dots-home.png) repeat, linear-gradient(to top, #242430 75%, #4d497d)',
  background: 'linear-gradient(to top, ' + MainBgColor + ' 75%, ' + MainLightBgColor + ')',
  borderWidth: 1,
  flexDirection: 'column',
  minHeight: '100%',
  display: 'flex'
};
export default App;
