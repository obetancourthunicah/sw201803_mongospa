import React, { Component } from 'react';
import { BrowserRouter as  Router, Route } from 'react-router-dom';

import AppTitle from './components/AppTitle/AppTitle';
import AppMenu from './components/AppMenu/AppMenu';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NewProduct from './components/NewProduct/NewProduct';

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
      <Router>
        <div>
            <AppTitle title={this.state.b} clickme={this.onBClicked.bind(this)}  />
            <AppMenu></AppMenu>
              <Route path="/"  exact component={ProductList} />
              <Route path="/product/:id"   component={ProductDetail} />
              <Route path="/new"   component={NewProduct} />
        </div>
      </Router>
    );
  }
}

export default App;
