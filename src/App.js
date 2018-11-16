import React, { Component } from 'react';
import logo from './logo.svg';
import AppTitle from './components/AppTitle/AppTitle';
import AppMenu from './components/AppMenu/AppMenu';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <AppTitle></AppTitle>
          <AppMenu></AppMenu>
          <div>Esto es un subtitulo</div>
      </div>
    );
  }
}

export default App;
