import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import eyeImg from '../icons/eye.svg';

import './ProductList.css';

const ListItem = (props) => {
  return(
    <li>
    <h3>{props.descripcion}</h3>
      <b>{props.codigo}</b>
      <Link className="prdview" to={`/product/${props._id}`}><img src={eyeImg}/></Link>
    </li>
  )
}

export default class ProductList extends Component {
  constructor(){
    super();
    this.state = {
      prods: [],
      page: parseInt(sessionStorage.getItem('page')) || 1,
      items: sessionStorage.getItem('items') || 20,
      redirect:''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getProductFromApi = this.getProductFromApi.bind(this);
    this.pageClick = this.pageClick.bind(this);
  } // constructor
  componentDidMount(){
    this.getProductFromApi(this.state.page);
  }
  pageClick(e){
    e.preventDefault();
    e.stopPropagation();
    let { name } = e.currentTarget;
    let { page } = this.state;
    if (name === "btnAnt" && page > 1){
      page--;
    }else{
      page ++;
    }
    this.getProductFromApi(page);
  }
  getProductFromApi(cpage){
    axios.get(`/api/productos/all/${this.state.items}/${cpage}`)
      .then(
        (response) => {
          let data = response.data;
          if (data.length > 0){
            this.setState({"prods": data, "page":cpage});
            sessionStorage.setItem('page', cpage);
          }
        }
      )
      .catch(
        (error) => {
          this.props.logout();
          this.setState({ prods: [], redirect: '/login' });
        }
      ); // axios
  }
  render(){
    if(this.state.redirect!==''){
      return ( <Redirect to="/login" />);
    }
    let productItems = this.state.prods.map(
      (o, i) => {
          return (<ListItem  {...o} key={o._id} />);
      }
    );
    return (
      <section>
        <p>Listado de Productos</p>
        <ul className="prdList">
          {productItems}
        </ul>
        <nav className="pager">
          <button name="btnAnt" onClick={this.pageClick}>Anterior</button>
          <span>{this.state.page}</span>
          <button name="btnSig" onClick={this.pageClick}>Siguiente</button>
        </nav>
      </section>
    )
  }
}
