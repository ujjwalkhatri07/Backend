import React, { Component } from 'react'
import {Row,Col,Modal,ModalHeader,ModalBody,ModalFooter,Container} from  'reactstrap';
import Axios from 'axios'
import   './category.css';
import { FiSearch } from "react-icons/fi";

export default class Category extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            category:[],  
            foods:[],
            food:[],
            catName:'',
            notes:'',
            quantity:'1',
            totalprice:'',
            searchedFoods:'',
            modal:false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
          modal:!this.state.modal
        })
    }  

    componentDidMount() {
        Axios.get('http://localhost:90/foodCat', this.state.config)
          .then((response) => {
            console.log(response.data)
            this.setState({
              category: response.data
            })
          })
          .catch((err) => console.log(err.response));
    }

    searchFood=(catId, catName)=>{
       Axios.get(`http://localhost:90/foods/searchByCat/${catId}`, this.state.config)
        .then((response)=>{
            const data=response.data
            if(data[0]!=null){
                this.setState({
                    foods:response.data,
                    catName:'Results for : '+ catName
                })
                console.log(this.state.catName)
            }
            else{
                this.setState({
                    catName :'No results found for : '+ catName,
                    foods:[]
                })   
            }
        })
    }

    handleFood = (foodId) => {
        this.setState({
          modal: !this.state.modal
        })
        Axios.get(`http://localhost:90/foods/${foodId}`, this.state.config)
          .then((response) => {
            const data = response.data;
            this.setState({
              food: data,
              totalprice: data.price
            });
            console.log("data fecth");
          }).catch(error => console.log(error.response));
    }

    addCart(){
        var token=localStorage.getItem('token')
        if(token!=null){
        //   if(localStorage.getItem('token'!=null)){
            
            Axios.post(`http://localhost:90/cart/`,
              {
                food: this.state.food._id,
                totalprice: (this.state.totalprice * this.state.quantity),
                notes: this.state.notes,
                quanity: this.state.quantity
              }, this.state.config)
              .then((response) => {
                console.log(response);
                alert("added to cart");
                this.setState({
                  modal: !this.state.modal
            
                }
                
                )
              }).catch((err) => console.log(err.response));
          }
        else{
            alert("Please login to add cart");
          }
    }

    searchbyName=(e)=>{
        if(e.target.value!=null){
            console.log(e.target.value)
            Axios.get(`http://localhost:90/foods/searchByName/${e.target.value}`, this.state.config)
            .then((response)=>{
                const data = response.data.food;
                console.log(response.data.food)
                if(data.length!==0){
                    this.setState({
                        foods:data,
                        searchedFoods:'Results for : '+ e.target.value
                    })
                }
                else{
                    this.setState({
                        foods:null,
                        searchedFoods:'No Results found for : '+e.target.value
                    })
                }
            }).catch((err)=>console.log(err.response))
        }
    }


    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <span>What would you like to order ?{' '}
                                <input style={{border: 'none',
                                    borderBottom: '2px solid #1ABC9C'}} 
                                    type="text" name="search" id="search" placeholder="search food..." 
                                    onChange={this.searchbyName}/>
                                <FiSearch style={{fontSize:"30px", opacity:0.6}}/>
                            </span>
                        </Col>
                    </Row>
                    <br/>
                    
                    <Row>
                        {this.state.category.map(catIcon =>
                        <Col>
                            <div key={catIcon._id} onClick={()=>this.searchFood(catIcon._id, catIcon.category)} style={{cursor:'pointer'}}>
                                <img alt="catPic" 
                                    style={{ width:'40px', height:'40px'}}
                                    className="categoryList"
                                    src ={`http://localhost:90/pictures/${catIcon.catImg}`} id="catImg"/> 
                                <h6 className="text-center">{catIcon.category}</h6>
                            </div>
                        </Col>
                        )}
                    </Row>    
                </div>
                <hr/>
                <div className="container">
                    <h3 style={{color:'FireBrick'}}>{this.state.catName?this.state.catName:''}</h3>
                    <h3 style={{color:'FireBrick'}} className="text-left">{this.state.searchedFoods?this.state.searchedFoods:''}</h3>
                    <Row>
                        {this.state.foods!=null ?                     
                        this.state.foods.map((food => 
                            <div className="Col-md-4" id="product">
                                <figure className="card card-product p-2">
                                    <img alt="foodPic" width='250' height='150' src={`http://localhost:90/pictures/${food.foodimage}`}/>
                                    <figcaption class="info-wrap">
                                        <legend className="title">{food.foodname}</legend>
                                        <h6 className="title">Rs. {food.price}</h6>
                                    </figcaption>
                                    <button class="btn btn-primary" onClick={()=>this.handleFood(food._id)}>Add to cart</button>
                                </figure>
                            </div>
                            )):''}
                    </Row>
                </div>

                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Item : {this.state.food.foodname}<br/>
                            Price : Rs.{this.state.food.price}
                    </ModalHeader>
                    <ModalBody>
                        <p>Add notes</p>
                        <textarea id="notes" className="col-md-10" value={this.state.notes} placeholder="Customize food as your taste" name="notes" onChange={this.handleChange}></textarea>
                        <hr/>
                        <p>Add quantity</p>
                        <input type="number" pattern="[0-9]*" name="quantity" min={1} value={this.state.quantity} onChange={this.handleChange} min="1" max="100" />
                    </ModalBody>
                    <ModalFooter>
                        <Container id="ftr">
                        <button className="btn btn-lg btn-success" id="btnbag" onClick={() => this.addCart(this.state.food._id)}>Add to cart</button>
                        </Container>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
