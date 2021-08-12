import React, { Component } from 'react'
import { Label, FormGroup, Button, Input } from 'reactstrap'
import Axios from 'axios'
import ListResturant from './ListResturant'


export default class AddRestuarant extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       resturant_name: null,
       resturant_address: null,
       fooditem: null,
       res_image: null,
       food : [],
       imgPreview:null,
       config: {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    },
    selectedFile: null,
    }
    this.handleFileSelect = this.handleFileSelect.bind(this)
  }

    handleFileSelect = (e) => {
      this.setState({
        selectedFile: e.target.files[0],
        imgPreview:URL.createObjectURL(e.target.files[0])
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleFoodChange = (e) => {
      this.setState({
        fooditem : e.target.value
      });
    }

    addRest = () => {
      const data = new FormData();
      data.append('imageFile',this.state.selectedFile)
      Axios.post('http://localhost:90/upload', data, this.state.config)
      .then((response) => {
          this.setState({
              res_image: response.data.filename
          })
          Axios.post('http://localhost:90/resturants',this.state,this.state.config)
          .then((response) => {
            alert("Restaurant added successfully");
            console.log(response.data)
          })
          .catch((err) => console.log(err.response))
      }).catch((err) => console.log(err.response))
    }
      

    render() {
      return (
        <>
     
        <div className="container">
          <h2>Add Resturant</h2><hr/>
          <div className="row">
            <div className="col-md-6">
              <form className="p-3">
                <FormGroup>
                  <Input type='text' id="resturantname" name='resturant_name' value={this.state.resturant_name}
                    onChange={this.handleChange} placeholder="Enter restaurant name" required/>
                </FormGroup>
                <FormGroup>
                  <Input type='text' id='resturant_address' name='resturant_address' value={this.state.resturant_address}
                    onChange={ this.handleChange} placeholder="Enter restaurant address" required/>
                    </FormGroup>
                  <FormGroup style={{display: "ruby"}}>
                    <Label className="btn btn-outline-info float-left" htmlFor="filePicker">Upload image for restaurant</Label>
                    <Input id="filePicker" style={{visibility:"hidden"}} type='file' name='res_image' onChange={this.handleFileSelect}/>
                  </FormGroup>
                  <Button type="submit" color='danger' style={{width:200},{marginTop:2}} onClick={this.addRest} block>Add Resturant</Button>
              </form>
            </div>
            <div className="col-md-4 flex">
              <img alt="Image Preview" 
              style={{display:'block', border: '1px solid gray', width:"200px", textAlign:'center'}} 
              src={this.state.imgPreview}/><br/>
            </div>
          </div>
              <hr></hr>
              <h2 style={{color:'#34495E'}}>View Restaurant</h2>
            <ListResturant />
          </div>
          </>
        )
      }
    }

