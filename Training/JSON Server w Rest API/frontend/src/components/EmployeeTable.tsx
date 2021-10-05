import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface Props {
    firstname: string,
    lastname: string,
    role: string,
    email: string,
    id: string
  };

class EmployeeTable extends Component <{},Props>{
    constructor(props: any) {
        super(props)

        // Setting up state
        // this.state = {
        //   firstname: "null",
        //   lastname: "null",
        //   role: "null",
        //   email: "null",
        //   id: ""
        // }
    }
    render() {
        return (
            <tr> 
                <td>{this.state.firstname}</td>
                <td>{this.state.lastname}</td>
                <td>{this.state.role}</td>
                <td>{this.state.email}</td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.state.id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}

export default EmployeeTable; 