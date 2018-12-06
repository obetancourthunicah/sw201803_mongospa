import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const ListItem = (props) => {
  return(
    <li>
    <h3>{props.descripcion}</h3>
    <b>{props.codigo}</b>
      <Link to={`/product/${props._id}`}>Ver</Link>
    </li>
  )
}

export default class ProductList extends Component {
  constructor(){
    super();
    this.state = {
      prods: [],
      redirect:''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  } // constructor
  componentDidMount(){
    axios.get('/api/productos/all/20/1')
      .then(
        (response)=>{
          let data = response.data;
          this.setState({"prods": data});
        }
      )
      .catch(
          (error)=>{
            this.props.logout();
            this.setState({prods:[], redirect:'/login'});
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
        <p>Estamos en Product List</p>
        <ul>
          {productItems}
        </ul>
      </section>
    )
  }
}
