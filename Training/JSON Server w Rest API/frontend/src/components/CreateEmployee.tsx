import React, { Component } from 'react';
import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';

type State = {
    firstname: string,
    lastname: string,
    role: string,
    email: string
  };

class CreateEmployee extends Component<{},State> {
    constructor(props: any) {
        super(props)

        // Setting up state
        this.state = {
          firstname: "null",
          lastname: "null",
          role: "null",
          email: "null"
        }
    
        // Setting up functions
        this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
        this.onChangeEmployeeLastName = this.onChangeEmployeeLastName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeeRole = this.onChangeEmployeeRole.bind(this);
        this.submitForm =  this.submitForm.bind(this);
      }


    
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

      submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();
        
        console.log(`Employee successfully created!`);
        console.log(`First Name: ${this.state.firstname}`);
        console.log(`Last Name: ${this.state.lastname}`);
        console.log(`Role: ${this.state.role}`);
        console.log(`Email: ${this.state.email}`);

        alert(`Employee successfully created!`);
        window.location.href = 'http://localhost:3000/employee-list';


        const employeeObject = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.role,
            email: this.state.email
          };
          axios.post('http://localhost:7000/employees/create-employee', employeeObject)
            .then(res => console.log(res.data));
    
        this.setState({firstname: '', lastname: '', role: '', email: ''})
    
      }

    render () {

        return (
            <div className= 'container'>
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
                        Create Employee
                    </Button>
                </Form>
            </div>
        )
    }
}

export default CreateEmployee