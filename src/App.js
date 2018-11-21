import React, { Component } from 'react';
import logo from './logo.svg';
import AppTitle from './components/AppTitle/AppTitle';
import AppMenu from './components/AppMenu/AppMenu';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      a: "Hola Mundo ",
      "b" : "Otro Hola "
    }
  }
  onClickCallBack(e){
   this.setState({
     ...this.state,
     a: this.state.a +=  " Clicked, "
   })
  }
  onBClicked(e) {
    this.setState({
      ...this.state,
      b: this.state.b += " Clicked, "
    })
  }
  render() {
    return (
      <div>
          <AppTitle title={this.state.b} clickme={this.onBClicked.bind(this)}  />
          <AppMenu></AppMenu>
        <AppTitle title={this.state.a} clickme={this.onClickCallBack.bind(this)} />
          <div>Esto es un subtitulo</div>
      </div>
    );
  }
}

export default App;
