import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import View from './components/View.jsx';

const App = () => (
  <div>
    <View />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));