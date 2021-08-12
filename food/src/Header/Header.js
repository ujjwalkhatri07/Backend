import { Component } from "react";
import {Link} from 'react-router-dom';
import { Nav, NavDropdown, Navbar, Form, Button, FormControl } from 'react-bootstrap';


class Header extends Component{
 
    render(){
      
      
      {
        if(localStorage.getItem('token') && localStorage.getItem('role')=="admin"){
          var menu=
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Food </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/add/food">Add food</Nav.Link>
              <Nav.Link href="/food/cat">Add Category</Nav.Link>
              <Nav.Link href="/restaurant/add">Add Restaurants</Nav.Link>
              <Nav.Link href="/user/show">Users</Nav.Link>
              <Nav.Link href="/show/contact">Conatct us</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/users/logout">Logout</Nav.Link>
              <Nav.Link eventKey={2} href="/user/single/:id">{localStorage.getItem('fullname')}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         
        }
        else if(localStorage.getItem('token') && localStorage.getItem('role')=="customer"){
          var menu=
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">Food </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/restaurant/register">Request</Nav.Link>
              <Nav.Link href="/category">Category</Nav.Link>
              <Nav.Link href="/foodsr">foods</Nav.Link>
              <Nav.Link href="/view/carts">Cart</Nav.Link>
              <Nav.Link href="/resturant">Restaurants</Nav.Link>
              <Nav.Link href="/popular">popular</Nav.Link>
              <Nav.Link href="/view/order">Order</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/users/logout">Logout</Nav.Link>
              <Nav.Link eventKey={2} href="/user/single">{localStorage.getItem('fullname')}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         
        }
      
   
        else{
        var menu=
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/home">Food</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/restaurant/register">Register Restaurant</Nav.Link>
      <NavDropdown title="Login/Signup" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/users/login">Login</NavDropdown.Item>
        <NavDropdown.Item href="/users/signup">Register</NavDropdown.Item>

        
       
      </NavDropdown>
      <Nav.Link href="/insert/contact">Conatct us</Nav.Link>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
      }
      }
    
        return(
          <div>
             {menu}
          </div>
         
        )
    }
}

export default Header