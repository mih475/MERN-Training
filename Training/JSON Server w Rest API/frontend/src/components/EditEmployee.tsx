import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { ChangeEvent } from 'react';

type State = {
    firstname: string,
    lastname: string,
    role: string,
    email: string
  };

class EditEmployee extends Component<{},State> {
    constructor(props: any) {
        super(props)
    
        this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
        this.onChangeEmployeeLastName = this.onChangeEmployeeLastName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeeRole = this.onChangeEmployeeRole.bind(this);
        this.submitForm =  this.submitForm.bind(this);
    
        // State
        this.state = {
            firstname: "null",
            lastname: "null",
            role: "null",
            email: "null"
        }
    }
    
    //   componentDidMount() {
    //       var id = window.location.hash.substr(1);
    //     axios.get('http://localhost:7000/employees/edit-employee/' + id)
    //       .then(res => {
    //         this.setState({
    //             firstname: res.data.firstname,
    //             lastname: res.data.lastname,
    //             role: res.data.role,
    //             email: res.data.email
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })
    //   }
    
    onChangeEmployeeFirstName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({firstname: e.target.value});
    };
    
     onChangeEmployeeLastName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({lastname: e.target.value});
      }

      onChangeEmployeeRole(e: ChangeEvent<HTMLInputElement>) {
        this.setState({role: e.target.value});
      }

      onChangeEmployeeEmail(e: ChangeEvent<HTMLInputElement>) {
        this.setState({email: e.target.value});
      }
    
    //   onSubmit(e) {
    //     e.preventDefault()
    
    //     const studentObject = {
    //       name: this.state.name,
    //       email: this.state.email,
    //       rollno: this.state.rollno
    //     };
    
    //     axios.put('http://localhost:7000/employees/update-employee/' + this.props.match.params.id, studentObject)
    //       .then((res) => {
    //         console.log(res.data)
    //         console.log('Student successfully updated')
    //       }).catch((error) => {
    //         console.log(error)
    //       })
    
    //     // Redirect to Student List 
    //     this.props.history.push('/employees')
    //   }

    submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        
        // console.log(`Employee successfully created!`);
        // console.log(`First Name: ${this.state.firstname}`);
        // console.log(`Last Name: ${this.state.lastname}`);
        // console.log(`Role: ${this.state.role}`);
        // console.log(`Email: ${this.state.email}`);

        // alert(`Employee successfully created!`);

        const employeeObject = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.role,
            email: this.state.email
        };
            var url = window.location.href;
            var location = url.lastIndexOf('/');
            var result = url.substring(location + 1);
            axios.put('http://localhost:7000/employees/edit-employee/'+ result, employeeObject)
            .then((res) => {
                console.log(res.data)
                alert('Employee successfully updated');
                window.location.href = 'http://localhost:3000/employee-list';
            }).catch((error) => {
                console.log(error)
            })
    
    
    } 
    
    
    render() {
        return (
        <div className="form-wrapper">
          <Form onSubmit={this.submitForm}>
            <Form.Group controlId="firstname" onChange={this.onChangeEmployeeFirstName}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <br/ >
            <Form.Group controlId="lastname" onChange={this.onChangeEmployeeLastName}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>        

            <br/ >
            <Form.Group controlId="role" onChange={this.onChangeEmployeeRole}>
                <Form.Label>Role</Form.Label>
                <Form.Control type="text"/>
            </Form.Group>

            <br/ >
            <Form.Group controlId="email" onChange={this.onChangeEmployeeEmail}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"/>
            </Form.Group>

            <br/ >
            <Button variant="danger" size="lg" type="submit">
                Update Employee
            </Button>
          </Form>
        </div>
        );
    }
}

export default EditEmployee