import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './AppMenu.css';
export default class AppMenu extends Component {
  constructor(){
    super();
    this.state={
      redirect:false
    }
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  logoutHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout();
    this.setState({redirect:true});
  }
  render() {
    if(!this.props.isAuthenticated){
      return ( null );
    }
    if(this.state.redirect){
      return (<Redirect to="/login"></Redirect>);
    }
    return(
        <nav>
          <ul className="menu">
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/new">Nuevo</Link></li>
            <li><a onClick={this.logoutHandler}>Logout</a></li>
          </ul>
        </nav>
    );
  }
}
