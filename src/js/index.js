import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router, Route } from 'react-router-dom';
import Convert from './components/Convert';

ReactDOM.render(
  <Router>
    <div>
      <main>
        <Route exact path='/' component={App} />
        {/* <Route path="/about" component={About} /> */}
        <Route path='/convert' component={Convert} />
      </main>
    </div>
  </Router>,
  document.getElementById('root')
);
