import React from 'react';
import EmployeeList from './components/EmployeeList';
import EditEmployee from './components/EditEmployee';
import CreateEmployee from './components/CreateEmployee';

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
//import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const App: React.FC = () =>{
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/employee-list"} className="nav-link">
                TCS Employee Portal
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-employee"} className="nav-link">
                  Create Employee
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/employee-list"} className="nav-link">
                  Employee List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={EmployeeList} />
                <Route path="/create-employee" component={CreateEmployee} />
                <Route path="/edit-employee/" component={EditEmployee} />
                <Route path="/employee-list" component={EmployeeList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
