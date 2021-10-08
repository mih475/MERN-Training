import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { EditEmployeeI } from './EditEmployeeInterface';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class EditEmployee extends Component<RouteComponentProps,EditEmployeeI> {
    constructor(props: RouteComponentProps) {
        super(props)
    
        this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
        this.onChangeEmployeeLastName = this.onChangeEmployeeLastName.bind(this);
        this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
        this.onChangeEmployeeRole = this.onChangeEmployeeRole.bind(this);
        this.submitForm =  this.submitForm.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

        // State
        this.state = {
            employee:{
                firstname: "",
                lastname: "",
                role: "",
                email: "",
            }
            
        }
    }
    
    public componentWillMount(): void {const api_url = 'http://localhost:7000/employees/' + this.getid();
        axios.get(api_url).then(response => {
            this.setState({employee: response.data});
        });
    }

    getid(){
        var url = window.location.href;
        var location = url.lastIndexOf('/');
        var result = url.substring(location + 1);
        return result;
    }
    
    onChangeEmployeeFirstName(e: ChangeEvent<HTMLInputElement>) {
        var employee = {...this.state.employee}
        employee.firstname = e.target.value;
        this.setState({employee});
    };
    
    onChangeEmployeeLastName(e: ChangeEvent<HTMLInputElement>) {
        var employee = {...this.state.employee}
        employee.lastname = e.target.value;
        this.setState({employee});
    }

    onChangeEmployeeRole(e: ChangeEvent<HTMLInputElement>) {
        var employee = {...this.state.employee}
        employee.role = e.target.value;
        this.setState({employee});
    }

    onChangeEmployeeEmail(e: ChangeEvent<HTMLInputElement>) {
        var employee = {...this.state.employee}
        employee.email = e.target.value;
        this.setState({employee});
    }

    submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        const employeeObject = {
            firstname: this.state.employee.firstname,
            lastname: this.state.employee.lastname,
            role: this.state.employee.role,
            email: this.state.employee.email
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
    
    deleteEmployee(id: any) {
        axios.delete('http://localhost:7000/employees/delete-employee/' + id)
            .then((res) => {
                alert('Employee successfully deleted!')
                window.location.href = 'http://localhost:3000/employee-list';
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        let singleEmployee = this.state.employee;

        return (
        <div className="form-wrapper">

          <Form onSubmit={this.submitForm}>
          
            <Form.Group controlId="firstname" onChange={this.onChangeEmployeeFirstName}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value = {singleEmployee.firstname} />
            </Form.Group>

            <br/ >
            <Form.Group controlId="lastname" onChange={this.onChangeEmployeeLastName}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value = {singleEmployee.lastname}/>
            </Form.Group>        

            <br/ >
            <Form.Group controlId="role" onChange={this.onChangeEmployeeRole}>
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" value = {singleEmployee.role}/>
            </Form.Group>

            <br/ >
            <Form.Group controlId="email" onChange={this.onChangeEmployeeEmail}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value = {singleEmployee.email}/>
            </Form.Group>

            <br/ >
            <Button variant="danger" size="lg" type="submit">
                Update Employee
            </Button>
            
            &nbsp;&nbsp;&nbsp;&nbsp;
            
            <Button onClick={() => this.deleteEmployee(this.getid())} size="lg" variant="danger">Delete</Button>
          </Form>
        </div>
        );
    }
}

export default EditEmployee