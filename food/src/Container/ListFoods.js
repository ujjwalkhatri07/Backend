import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import Axios from 'axios'


export default class ListFoods extends Component {
    constructor(props) {
        super(props)
        this.state = {
          _id: '',
          foodname: '',
          foodimage: '',
          price:'',
          imgpreview:null,
          popular: [],
          food: [],
          categorys:[],
          resturant:[],
          resSelect:'',
          catSelect:'',
          modal : false,
          isupdated: false,
          config: {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          },
          selectedFile: null,
        }
        this.toggle = this.toggle.bind(this);
    } 
             
    componentDidMount() {
      Axios.get('http://localhost:90/foods',this.config)
        .then((response)=>{
          const data = response.data;
          this.setState({popular:  data});
          this.setState({food: data});
          console.log(this.state.popular);
        }).catch(error => console.log(error.response));

      Axios.get('http://localhost:90/resturants',this.state.config)
      .then((response)=>{
        const data = response.data;
        this.setState({
            resturant: data,
            resSelect:data[0]._id
          });        
      }).catch(error => console.log(error.response));

      Axios.get('http://localhost:90/foodCat', this.state.config)
        .then((response)=>{
            const data = response.data;
            this.setState({
                categorys:data,
                imgpreview:data.catImg,
                catSelect:data[0]._id
            });
        }).catch(err=>console.log(err.response));
    }

    toggle=()=>{ 
      this.setState({
        modal: !this.state.modal
    })}
        
    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgpreview: URL.createObjectURL(e.target.files[0])
      })
    }
     
    uploadFile = (e) => {
      e.preventDefault();
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      Axios.post('http://localhost:90/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            foodname: this.state.foodname,
            price:this.state.price,
            foodimage: response.data.filename
          })
        }).catch((err) => console.log(err.response))
    }
     
       
    handleChange = (e)  =>{
      this.setState({
        [e.target.name]: e.target.value 
      })
    }

    deletefood(foodId){
      Axios.delete(`http://localhost:90/foods/${foodId}`, this.state.config)
      .then((response) => {
        console.log(response);
        window.location.reload()   
      })
      .catch(error => console.log(error.response));
    }

    handleEdit = (foodId) => {
      this.setState({
        modal: !this.state.modal
      });
      Axios.get(`http://localhost:90/foods/${foodId}`,this.state.config)
      .then((response)=>{
        const data = response.data;
          this.setState({
            food: data,
            resSelect:data.restaurant._id,
            catSelect:data.category._id,
            imgpreview:`http://localhost:90/pictures/${data.foodimage}`
          });    
        console.log("data fecth"+data);
        })
      .catch(error => console.log(error.response));
    }

    handleupdate = (e) =>{
      this.setState({
        food: { ...this.state.food, [e.target.name]: e.target.value }
      })
    }
     
    updateFood = (foodId) => {
      const data = new FormData()
      data.append('imageFile', this.state.selectedFile)
      Axios.post('http://localhost:90/upload', data, this.state.config)
        .then((response) => {
          this.setState({
            foodimage: response.data.filename
          })
          Axios.put(`http://localhost:90/foods/${foodId}`, 
            { 
              foodname: this.state.food.foodname, 
              price: this.state.food.price,
              foodimage: this.state.foodimage, 
              restaurant: this.state.resSelect,
              category: this.state.catSelect
            }, this.state.config)
          .then((response) => {
            alert("Food updated successfully")
            console.log(response.data)
            window.location.reload();
          })
          .catch((err)=>console.log(err.response))
        })
        .catch((err) => console.log(err.response))
    }
    
    render() 
    {
        return (
          
            <Table hover>
            <thead>
            <h1>Foods</h1>
              <tr>
                <th>Restaurant Name</th>
                <th>Category</th>
                <th>Food Name</th>
                <th>Food price</th>
                <th>Food image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.popular.map(pop => 
                <tr key={pop._id}>
                  <td>{pop.restaurant.resturant_name}</td>
                  <td>{pop.category.category}</td>
                  <td>{pop.foodname}</td>
                  <td>{pop.price}</td>
                  <td>
                    <img alt="foodPic" src={`http://localhost:90/pictures/${pop.foodimage}`} style={{height: "50px",width:"50px"}}/>
                  </td>
                  <td>
                    <a className="btn btn-primary" onClick={() => this.handleEdit(pop._id)}>Update</a>
                  </td>
                  <td>
                    <a onClick={() => this.deletefood(pop._id)} className="btn btn-danger" href="">Delete</a>
                  </td>
                </tr>
                )
              }
    
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggle}><legend><h3>Update Food</h3></legend></ModalHeader>
                <ModalBody>
                  <form>
                    <div className="form-group">
                      <label for='foodname'> Food Name</label>
                      <input type="text" name="foodname" className="form-control" 
                        value ={this.state.food.foodname} onChange={this.handleupdate}/>
                    </div>
                    <div className="form-group">
                      <label for='price'>Food price</label>
                      <input type="text" name="price" className="form-control"
                        value={this.state.food.price} onChange={this.handleupdate}  />
                    </div>
                    <div className="form-group">
                        <label for='resOption'>
                            <legend style={{fontSize:16}}>Choose Restaurant: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.resSelect} name='resSelect' id='resOption' style={{width:200, textAlign:'center'}}>
                            {
                              this.state.resturant.map(option=>
                                  <option key={option._id} value={option._id}>{option.resturant_name}</option>
                              )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label for='resOption'>
                            <legend style={{fontSize:16}}>Choose Food Category: </legend>
                        </label>
                        {' '}
                        <select onChange={this.handleChange} value={this.state.catSelect} name='catSelect' id='catOption' style={{width:200, textAlign:'center'}}>
                          {
                            this.state.categorys.map(option=>
                                <option key={option._id} value={option._id}>{option.category}</option>
                            )
                          }
                        </select>
                    </div>
                    <img className='img-thumbnail' width='200' 
                      src={this.state.imgpreview} alt="foodimg" />
                    <Input type='file' name='foodimage' id='foodimg'
                      onChange={this.handleFileSelect} value={this.state.image}/> 
                    <Button className="btn btn-primary btn-block" 
                      onClick={() => this.updateFood(this.state.food._id)}>Update</Button>
                  </form>     
                </ModalBody>
                <ModalFooter></ModalFooter>
              </Modal>
            </tbody>
          </Table>
        )
    }
}
