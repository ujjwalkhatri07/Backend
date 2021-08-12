import { Component } from "react";


class Logout extends Component{
    componentDidMount(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('fullname')

        window.location.href='/users/login'
        
    }
    render()
    {
        return(
            <div>Unauth</div>
        )
    }
   
       
    }


export default Logout