import { Component } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'


class Register extends Component{
    state={
        fullname:"",
        password:"",
        email:""
       
    }
    sendUserData = ( ) =>{
        const data={
            fullname:this.state.fullname,
            email:this.state.email,
            password:this.state.password,
        }
        axios.post("http://localhost:90/users/signup",data).then(alert("Register Successfull")).catch(error=>{console.log(error);})
    }
    render(){
        return(

<section className="Form my-4 mx-5 pt-5 pb-5">
            <div className="container">
                <div className="row no-gutters shadow" style={{background:'white', borderRadius:'3px'}}>
                   
                    <div className="col-lg-5">
                      
                            <img alt="login" src="https://www.gpslink.co.uk/static/assets/img/login.png" className="img-fluid" style={{ height: '400px',marginTop:'100px' }} />

                        
                    </div>
                    <div className="col-lg-5 no gutters">
                       
                    <h1 className="font-weight-bold py-4">Registration Form</h1>
                    <h5 className="ml-5">Fill your registration form now</h5>
        <br>
        </br>
                             


                                <form>
     
         





            <div className="form-group"><input type="Text" className="form-control" placeholder="Name" value={this.state.fullname} onChange={(event)=>{this.setState({fullname:event.target.value})}}/>
           </div>

           <div className="form-group"><input type="Text" className="form-control" placeholder="Email" value={this.state.email} onChange={(event)=>{this.setState({email:event.target.value})}}/>
           </div>

          
           <div className="form-group"><input type="Password" className="form-control" placeholder="Password" value={this.state.password} onChange={(event)=>{this.setState({password:event.target.value})}}/>
           </div>
           <div className="form-group"><input type="Password" className="form-control" placeholder="Confirm Password"/></div>
           
           
           <button  style={{textAlign:'center'}} type="submit" onClick={this.sendUserData} className="btn btn-primary"> Sign up </button>

           <br></br>

           <p className="signUp text-left ml-3"> Already have an account <Link exact to="login"><b> Login here </b></Link></p>

            </form>
            </div>
            </div>
            </div>
            </section>




          
          
            
        )
    }
}

export default Register