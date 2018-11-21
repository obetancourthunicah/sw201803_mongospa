import React, { Component } from 'react';


/*class AttpTitle extends component {

}

export default AppTitle;
*/

export default  class AppTitle extends Component{
  render(){
    return (
      <header>
          <h1 onClick={this.props.clickme} >{this.props.title}</h1>
      </header>
    );
  }
}
