import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      "codbarra":'',
      "nombre": '',
      "precio": 0,
      "stock": 0,
      "imagen": '',
      "precioError":'',
      "nombreError": '',
      "redirect":''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onChangeHandler(e){
    let { name, value  } = e.currentTarget;
    this.setState({...this.state, [name]:value});
  }
  onClickHandler(e){
    e.preventDefault();
    e.stopPropagation();
    //alert("Hizo Click en el Botón" + JSON.stringify(this.state));
    let errorKeys = {}
    if(parseInt(this.state.precio) == 0){
      errorKeys.precioError = 'El Precio no Puede se 0';
    }
    if((/^\s*$/).test(this.state.nombre)){
      errorKeys.nombreError = 'El nombre del Producto es necesario!';
    }
    if (Object.keys(errorKeys).length){
      this.setState({...this.state, ...errorKeys});
    }else{
      //lamar a guardar en api
      let postData = {
        "codigo": this.state.codbarra,
        "descripcion": this.state.nombre,
        "precio": parseFloat(this.state.precio),
        "iva": 0.16,
        "stock": parseInt(this.state.stock)
      };
      axios.post('/api/productos/new', postData)
        .then( (resp) => {
          alert('Producto Guardado Satisfactoriamente');
          this.setState({
            "codbarra": '',
            "nombre": '',
            "precio": 0,
            "stock": 0,
            "imagen": '',
            "precioError": ''
          });
        })
        .catch(
          (err)=>{
            this.setState({redirect:'/login'});
            alert('Error al guardar el Productos');
          }
        );
    }
  }
  render() {
    if (this.state.redirect !== ''){
      return (<Redirect to="/login" />);
    }
    return (
      <section>
      <p>Estamos en New Product</p>
      <fieldset>
        <label>Código de Barras</label>
          <input type="text" name="codbarra" value={this.state.codbarra}
            onChange={this.onChangeHandler}
          />
      </fieldset>
      <fieldset>
        <label>Nombre</label>
        <input type="text"  name="nombre" value={this.state.nombre} onChange={this.onChangeHandler}/>
         {(this.state.nombreError !== '')? (<span>{this.state.nombreError}</span>): null}
      </fieldset>
      <fieldset>
        <label>Precio</label>
        <input type="number"  name="precio" onChange={this.onChangeHandler} value={this.state.precio}/>
        {(this.state.precioError !== '')? (<span>{this.state.precioError}</span>): null}
      </fieldset>
      <fieldset>
        <label>Stock Inicial</label>
        <input type="number" name="stock" value={this.state.stock} onChange={this.onChangeHandler} />
      </fieldset>
      <fieldset>
        <label>Imagen</label>
        <input type="text" name="imagen" value={this.state.imagen} onChange={this.onChangeHandler} />
      </fieldset>
      <fieldset>
        <button onClick={this.onClickHandler}>Guardar</button>
      </fieldset>
      </section>
    )
  }
}
