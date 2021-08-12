import { Component } from "react";

class Footer extends Component{
    render(){
        return(
            
         
          <footer className="page-footer font-small mdb-color lighten-3 pt-4">


          <div className="container text-center text-md-left">
        
          
            <div className="row">
        
        
              <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1">
        
                
                <h5 className="font-weight-bold text-uppercase mb-4">Food hunt</h5>
                <p>Welcome to Food hunt</p>
                <p>You can buy food items at affordable price.</p>
        
              </div>  
         
        
              <hr className="clearfix w-100 d-md-none"/>
        
              <div className="col-md-2 col-lg-2 mx-auto my-md-4 my-0 mt-4 mb-1">
        
        
                <h5 className="font-weight-bold text-uppercase mb-4">Quick links</h5>
        
                <ul className="list-unstyled">
                  <li>
                    <p>
                      <a href="../dashboard">Dashboard</a>
                    </p>
                  </li>
             
                  
                 
                </ul>
        
              </div>
        
        
              <hr className="clearfix w-100 d-md-none"/>
        
        
              <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
        
         
                <h5 className="font-weight-bold text-uppercase mb-4">Address</h5>
        
                <ul className="list-unstyled">
                  <li>
                    <p>
                      <i className="fas fa-home mr-3"></i> Kathmandu , Dillibazar </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-envelope mr-3"></i> food@gmail.com</p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                  </li>
                </ul>
        
              </div>
          
        
              <hr className="clearfix w-100 d-md-none"/>
        
              <div className="col-md-2 col-lg-2 text-center mx-auto my-4">
        
        
                <h5 className="font-weight-bold text-uppercase mb-4">Follow Us</h5>
        
        
                <a type="button" className="btn-floating btn-fb" href="http://facebook.com">
                  <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                </a>
          
                <a type="button" className="btn-floating btn-tw" href="http://instagram.com">
                  <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                </a>
        
        
              </div>
        
        
            </div>
        
        
          </div>
        
        
        
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://food.com/"> Food</a>
          </div>
        
        
        </footer>
      
        )
    }
}

export default Footer