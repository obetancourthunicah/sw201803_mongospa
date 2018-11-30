import React, { Component } from 'react';
import { BrowserRouter as  Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import AppTitle from './components/AppTitle/AppTitle';
import AppMenu from './components/AppMenu/AppMenu';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NewProduct from './components/NewProduct/NewProduct';
import Login from './components/Login/Login';

import './App.css';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }} />
  );
}

function PPRoute({ component: Component, isAuthenticated, logout, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} logout={logout} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}



class App extends Component {
  constructor(){
    super();
    this.state={
      "user": sessionStorage.getItem('user') || '',
      "isAuthenticated": sessionStorage.getItem('user') && true
    }
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setLogout = this.setLogout.bind(this);
  }
  setLoggedIn(user){
    sessionStorage.setItem('user', user);
    this.setState({ "user": user  ,'isAuthenticated': true});
  }
  setLogout(){
    this.setState({user:'', 'isAuthenticated':false});
    sessionStorage.clear();
    axios.get('/api/security/logout');
  }

  render() {
    return (
      <Router>
        <div>
            <AppTitle title="Gestión de Productos"  />
             <AppMenu isAuthenticated={this.state.isAuthenticated} logout={this.setLogout}></AppMenu>
              <PPRoute path="/"  exact
                  isAuthenticated={this.state.isAuthenticated}
                  component={ProductList} />
              <PPRoute path="/product/:id" component={ProductDetail}
                  isAuthenticated={this.state.isAuthenticated} />
              <PPRoute path="/new"
                    component={NewProduct}
                    isAuthenticated={this.state.isAuthenticated} />
              <PRoute path="/login" component={Login} setLoggedIn={this.setLoggedIn} />
        </div>
      </Router>
    );
  }
}

export default App;
