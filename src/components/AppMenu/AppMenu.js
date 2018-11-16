import React, { Component } from 'react';
import './AppMenu.css';
export default class AppMenu extends Component {
  render() {
    return(
        <nav>
          <ul className="menu">
            <li><a href="">Opción 1</a></li>
            <li><a href="">Opción 2</a></li>
            <li><a href="">Opcion 3</a></li>
          </ul>
        </nav>
    );
  }
}
