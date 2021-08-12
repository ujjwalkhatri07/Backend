import React, { Component } from 'react'
import {Row,Container } from 'reactstrap'
import './popular.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Restaurant extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      resturant_name: '',
      res_image: '',
      _id:'',
       popular: [],
    }
  }

  componentDidMount() {
    Axios.get('http://localhost:90/resturants',this.config)
    .then((response)=>{
      const data = response.data;
      this.setState({popular:  data});
      console.log("data fecth");
    }).catch(error => console.log(error.response));
  }
  
    render() {
      console.log(this.state.popular)
        return (
           <Container style={{backgroundColor:'LightCyan'}}>
             <legend style={{color:'Maroon'}}>View Resturants</legend>
           <Row>
            {
              this.state.popular.map((pop => 
                <div key={pop._id} className="Col-md-4" id="product">
                  <figure className="card card-product">
                    <Link to={`/viewRes/${pop._id}`}>
                    <img width='200' height='200' alt='restaurantPic' src={`http://localhost:90/pictures/${pop.res_image}`}/></Link>
                    <figcaption className="info-wrap">
                      <h4 className="title">
                        <Link to={`/viewRes/${pop._id}`}>
                        {pop.resturant_name}</Link>
                      </h4>
                    </figcaption>
                  </figure>
                </div>
              ))
            }
           </Row>
           <hr></hr>
            </Container>
        )
    }
  }
