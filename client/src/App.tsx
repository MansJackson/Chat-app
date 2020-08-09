import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
