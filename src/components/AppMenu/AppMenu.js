import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AppMenu.css';
export default class AppMenu extends Component {
  render() {
    return(
        <nav>
          <ul className="menu">
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/new">Nuevo</Link></li>
          </ul>
        </nav>
    );
  }
}
