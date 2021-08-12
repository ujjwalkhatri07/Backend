import React, { Component } from 'react'
import Axios from 'axios';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    Label,
    FormGroup
  } from 'reactstrap';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isShow:false,
            currentPassword:'',
            newPassword:'',
            retypePassword:'',
            newPass:false,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:90/users/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    openModal = () =>{
        this.setState({
            isShow: !this.state.isShow
        })
    }
    
    handleupdate = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:90/users/me', this.state.user, this.state.config)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('fullname', response.data.fullname);
                alert("Profile updated successfully")
                this.props.history.push('/viewProfile');
            })
            .catch((err) => console.log(err.response));
    }

    changePassword = (e) => {
        e.preventDefault();
        if(this.state.newPassword!=this.state.retypePassword){
            alert("Password did not matched");
        }
        else{
            Axios.put('http://localhost:90/users/updatePassword', {password:this.state.newPassword, id:this.state.user._id}, this.state.config)
                .then((response) => {
                    if(response.data.status===200){
                        alert("Password changed successfully");
                        window.location.reload();
                    }
                })
                .catch((err) => console.log(err.response));
        }
    }

    verifyPassword = (e) => {
        e.preventDefault();
        let passwordValue = this.state.currentPassword;
        let userIdValue = this.state.user._id;
        Axios.post('http://localhost:90/users/verifyPassword', {password:passwordValue, id:userIdValue},  this.state.config)
            .then((response) => {
                console.log(response.data);
                if (response.data.status===200){
                    this.setState({
                        newPass:true,
                        currentPassword:''
                    })
                    e.target.value="";
                }
                else{
                    alert("Invalid Password");
                }
            })
            .catch((err) => console.log(err.response));
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    handlePasswordChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        if (this.state.user === null) {
            return <h3>Loading ...</h3>
        } else {
        return (
            <div className="container">
               
                <br/>
                <form className="col-md-6">
                    <legend><h3>Update Profile</h3></legend>
                    <div className="form-group">
                        <label className="float-left">Full Name</label>
                        <input type="text" name="fullname" className="form-control"
                        value={this.state.user.fullname}  onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label className="float-left">Email</label>
                        <input type="text" name="email" className="form-control"
                        value={this.state.user.email}  onChange={(e) => this.handleChange(e)}  />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleupdate}>Update</button>
                    <a onClick={this.openModal} className="btn btn-danger btn-block" style={{cursor:'pointer'}}>Change password</a>
                </form>

                <Modal isOpen={this.state.isShow} toggle={this.openModal}>
                    <ModalHeader><legend>Change Password</legend></ModalHeader>
                    <ModalBody>
                        <Form>
                            {this.state.newPass?
                                (
                                    <div>
                                    <FormGroup>
                                        <Label>New password</Label>
                                        <Input type="password" onChange={(e) => this.handlePasswordChange(e)} name="newPassword" className="form-control" placeholder="Enter new password" required/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Retype password</Label>
                                        <Input type="password" onChange={(e) => this.handlePasswordChange(e)} name="retypePassword" className="form-control" placeholder="Retype new password" required/>
                                    </FormGroup>
                                    <Button type="submit" onClick={this.changePassword} color="primary" size="lg" block>Update password</Button>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <FormGroup>
                                            <Label>Current password</Label>
                                            <Input type="password" onChange={(e) => this.handlePasswordChange(e)} name="currentPassword" className="form-control" placeholder="Enter current password" required/>
                                        </FormGroup>
                                        <Button type="submit"  onClick={this.verifyPassword} color="primary" size="lg" block>Verify password</Button>
                                    </div>
                                )
                            }
                        </Form>
                    </ModalBody>    
                </Modal>
            </div>
        )}
    }
}

