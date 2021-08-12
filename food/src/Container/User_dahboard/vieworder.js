import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';


export default class ViewOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user : '',
            modal:false,
            food : '',
            quanity : '',
            orderDate:'',
            totprice: '',
            totAmt:0,
            orders: [],
            viewOrder:[],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
        this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount() {
      Axios.get('http://localhost:90/order',this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({
          orders: data
          });
          console.log(data);
        }).catch((err) => console.log(err.response));
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      })
    }

    handleViewOrder=(orderId)=>{
      this.setState({
        modal: !this.state.modal,
        orderDate:orderId
      })
      Axios.get(`http://localhost:90/order/${orderId}`, this.state.config)
        .then((response)=>{
          const data = response.data;
          this.setState({viewOrder:data});
          console.log(this.state.viewOrder);
        }).catch((err)=>console.log(err.response));
    }

    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
    }
    
    render() {
      this.state.totAmt = this.state.viewOrder.reduce(
        (prevValue, currentValue) => prevValue + currentValue.food.price*currentValue.quanity,0);
        return (
            <div>
   
              <Table hover>
                <thead>
                  <tr class='h4'>
                    <th>Ordered date & time</th>
                    <th>View Order</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.orders.map(order => {
                    return(
                      <tr key={order._id}>
                          <td>
                          <h5>{order._id}</h5>
                          </td>
                          <td><button type="button" class="btn btn-primary"
                          onClick={() => this.handleViewOrder(order._id)}>View Invoice</button></td>
                      </tr>
                    )})
                  }
                </tbody>
              </Table>

              <Modal size="md" isOpen={this.state.modal} modalTransition={{ timeout: 200 }} backdropTransition={{ timeout: 300 }}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle} style={{color:'#1f618d', backgroundColor:'#F4F6F6'}}>
                  <h3>Food</h3>
                </ModalHeader>
                <ModalBody className="printDiv" style={{backgroundColor:'#F8F9F9'}}>
                  <h3 className="billHeader">Food</h3>
                  <h5>Ordered Date : <span class="h6"> {this.state.orderDate} </span></h5>
                  <h5>Name : <span class="h6"> {localStorage.getItem('fullname')} </span></h5>
                  <Table>
                    <thead>
                    <tr>
                        
                      <th>Food Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.viewOrder.map(listItem=>{
                          return(
                            <tr key={listItem._id}>
                               
                              <td>{listItem.food.foodname}</td>
                              <td>{listItem.quanity}</td>
                              <td>{listItem.food.price}</td>
                              <td>{listItem.food.price*listItem.quanity}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" align="right">
                          <h4 style={{color:'#34495E'}}>Total Amount: Rs {this.state.totAmt}</h4>
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </ModalBody>
                <ModalFooter style={{backgroundColor:'#F4F6F6'}}>
                  <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
        )
    }
}
