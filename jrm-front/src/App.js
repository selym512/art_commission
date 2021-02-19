import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * 
 */
class App extends React.Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props){
    super(props);

    this.state = {
      error : null,
      isLoaded : true,
      email : null,
      pass : null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * 
   * @param {*} e 
   */
  handleChange = e =>{
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name] : value});
  };

  /**
   * 
   * @param {*} e 
   */
  handleSubmit = e =>{
    //this.setState({value : e.target.value});

    //console.log("this.state.email : " + this.state.email);
    //console.log("this.state.pass : " + this.state.pass);

    var email = this.state.email;
    var pass = this.state.pass;

    //console.log("email : " + email);
    //console.log("pass : " + pass);

    if(email != null && pass !=null){
      var body = {
        email : email,
        pass : pass
      }
      fetch('http://localhost:3000/user/create_user', {
        method: "POST",
        mode : 'cors',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email : email,
          pass : pass
        })
      }).then(res => res.json()).then(result =>{
        console.log(result);
      }).catch(err =>{
        console.log(err);
      })
    }
  }

  /**
   * 
   */
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="email">email</label><input type="text" name="email" id="email" placeholder="Enter Email" class="form-control" onChange={this.handleChange}></input><br />
          </div>
          <div class="form-group">
          <label for="pass">pass</label><input type="password" name="pass" id="pass" placeholder="Enter Password" class="form-control" onChange={this.handleChange}></input>
          </div>
          <input type="submit" value="Submit" class="btn btn-primary"></input>
        </form>
      </div>
    );
  }
}

export default App;
