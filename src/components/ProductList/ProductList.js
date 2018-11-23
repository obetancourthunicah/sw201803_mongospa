import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  constructor(){
    super();
  }
  render(){
    return (
      <section>
        <p>Estamos en Product List</p>
        <ul>
        <li><Link to="/product/codigo1">Producto 1</Link></li>
        <li><Link to="/product/codigo2">Producto 2</Link></li>
        </ul>
      </section>
    )
  }
}
