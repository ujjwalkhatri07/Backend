import React,{ Component } from "react";
import {Route, Link} from 'react-router-dom';
import axios from 'axios';


class ViewRestaurantRequest extends Component{
    state = {
        users : [],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        }
    }
    componentDidMount(){
        axios.get("http://localhost:90/users/user/show",this.state.config)
        .then((response)=>{
            console.log(response)
            this.setState({
                users : response.data
            })
        })
        .catch((err)=>{
            console.log(err.response)
        })
    }
    

       
    render(){
        return(
            <div id="prd">
                
               
            {this.state.users.map((user)=>{
                        return (

                            
                            
                        <div className="col-lg-6" id="prd">


                            <div id="marg"></div>
                            
                            
                            <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">User Type</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{user.fullname}</th>
      <td>{user.email}</td>
      <td>{user.role}</td>
      
    </tr>
    <tr></tr>
    </tbody>
    </table>
    
    <p><button className="btn btn-danger">Delete</button></p>

    
                            </div>
                            
                        
                            ) 
                    })
                }
                </div>
              
    )
        
    }
}
export default ViewRestaurantRequest;