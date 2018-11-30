import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component{
  constructor(){
    super();
    this.state= {
      txtEmail:'',
      txtPswd:'',
      redirecto:''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  onChangeHandler(e){
    let {name , value } = e.currentTarget;
    this.setState({...this.state, [name]:value});
  }
  onClickHandler(e){
    //Hacer Algo Aqui
    //Hace las validaciones
    let postData = {
      user :this.state.txtEmail,
      pswd: this.state.txtPswd
    }
    axios.post('/api/security/login', postData)
      .then((resp)=>{
        if(resp.data.status==="logged"){
          this.props.setLoggedIn(this.state.txtEmail);
          this.setState({redirecto:'/productos'});
        }else{
          alert("No se pudo validar sus credenciales");
          this.setState({"txtPswd":''});
        }
      })
      .catch(
        (error)=>{
          console.error(error);
          this.setState({ "txtPswd":""});
        }
      )
  }
  render(){
    if(this.state.redirecto!==''){
      return( <Redirect to="/" />)
    }
    return(
      <div>
      <fieldset>
        <label htmlFor="txtEmail">Correo Electrónico</label>
        <input type="email" name="txtEmail" id="txtEmail"
          placeholder="corre@electr.nico"
          onChange={this.onChangeHandler}
          value={this.state.txtEmail} />
      </fieldset>
      <fieldset>
        <label htmlFor="txtPswd">Contraseña</label>
          <input type="password" name="txtPswd" id="txtPswd"
          placeholder="contraseña"
          onChange={this.onChangeHandler}
            value={this.state.txtPswd} />
      </fieldset>
      <fieldset>
      <button onClick={this.onClickHandler}>Iniciar Sesión</button>
      </fieldset>
      </div>
    );
  }
}
