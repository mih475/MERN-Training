import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import ReactDOM from 'react-dom';


class EmployeeForm extends React.Component {
  /*const EmployeeForm = (props) => {*/


  constructor(props) {
    super(props);

    this.initialState = {
        name: '',
        job: ''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const {name, value} = event.target;

    this.setState(
        {
            [name]: value
        }
    );
}

submitForm = () => {
    this.props.handleChange(this.state);
    this.setState(this.initialState);
}

render() {
    const {name, job} = this.state;

    return (
        <form>
            <label>Name </label>
            <input name='name' value={name} onChange={this.handleChange} />
            <label>Job</label>
            <input name='job' value={job} onChange={this.handleChange} />
            <input type='button' onClick={this.submitForm} />
        </form>
    );
}
  
  
  
  
  
  
  
  
  
  /*
  render(){
    const formik = useFormik({
      initialValues: {
        Id: '',
        Name: '',
        Location: '',
        Salary:''
      },
      onSubmit: values => {
        alert(JSON.stringify(values));
      },
    });
    return (
      <div>
      <h2>Enter Employee Details...</h2>
      <form onSubmit={formik.handleSubmit}>
        <p>
        <label htmlFor="Id">Employee ID </label>
        <input
          id="Id"
          name="Id"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.Id}
        />
        </p>
        
        <p>
        <label htmlFor="Name">Employee Name </label>
        <input
          id="Name"
          name="Name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.Name}
        />
        </p>
        <p>
        <label htmlFor="Location">Employee Location </label>
        <input
          id="Location"
          name="Location"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.Location}
        />
        </p>
        <p>
        <label htmlFor="Salary">Employee Salary </label>
        <input
          id="Salary"
          name="Salary"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.Salary}
        />
        </p>
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }

  */

















  /*
  const [employee, setBook] = useState({
    first_name: props.employee ? props.employee.first_name : '',
    last_name: props.employee ? props.employee.last_name : '',
    email: props.employee ? props.employee.email : ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { first_name, last_name, email } = employee;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [first_name, last_name, email];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const employee = {
        id: uuidv4(),
        first_name,
        last_name,
        email
      };
      props.handleOnSubmit(employee);
    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  };

  

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="first_name"
            value={first_name}
            placeholder="Enter first name"
            onChange={this.handleInputChange} 
          />
        </Form.Group>
        <Form.Group controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="last_name"
            value={last_name}
            placeholder="Enter last name"
            onChange={this.handleInputChange} 
          />
        </Form.Group>
        
        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="email"
            value={email}
            placeholder="Enter email address"
            onChange={this.handleInputChange} 
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );

  */
}

/*ReactDOM.render(element,document.getElementById("root"));*/


export default EmployeeForm;