import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './ProductDetail.css';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state={
      prd : {},
      redirectTo:''
    }
  }
  componentDidMount(){
    // http://localhost:3001/api/productos/byid/asdfas234asdf
    axios.get(`/api/productos/byid/${this.props.match.params.id}`)
    .then(
      (response)=>{
        this.setState({prd:response.data});
      }
    )
    .catch(
      (resp)=>{
        this.props.logout();
        this.setState({prd:{}, redirectTo:'/login'});
      }
    )
  }
  render() {
    if(this.state.redirectTo){
      return (<Redirect to={this.state.redirectTo} />);
    }
    let { codigo, descripcion, precio, stock } = this.state.prd;
    return (
      <div className="prddetail">
        <h1>{codigo}</h1>
        <p>{descripcion}</p>
        <b className="prdprc">L.<span>{(precio || 0).toFixed(2)}</span></b>
        <b className="prdstk">{stock} unds</b>
      </div>
    )
  }
}
