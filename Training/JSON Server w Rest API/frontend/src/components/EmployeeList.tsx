import React, { Component, Props } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import _ from 'lodash';
import { EmployeeIStates } from './EmployeeInterfaceStates';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { Table } from 'react-bootstrap';

// type State = {
//     employees: []
// };
function Get() {
  return useParams();
 }

class EmployeeList extends Component<RouteComponentProps,EmployeeIStates> {

    constructor(props: RouteComponentProps) {
        super(props)
        this.deleteEmployee = this.deleteEmployee.bind(this);

        // this.state = {
        //   employees: []
        // };
        
        this.state = {
          datarecords: [],
          datacolumns: []
        };
      }
    
      //Methods
      public componentWillMount(): void {const api_url = 'http://localhost:7000/employees/';
        axios.get(api_url).then(response => {
        this.setState({datarecords: response.data});
        this.extractColumnNames();
        });
      }

      private extractColumnNames() {
        const firstrecord = _.keys(this.state.datarecords[0]);
        this.setState({datacolumns: firstrecord,});
      }

      private displayRecords(key: number){
        const datacolumns= this.state.datacolumns;
        return datacolumns.map((each_col) =>
        this.displayRecordName(each_col,key))
      }

      private displayRecordName(colname:string, key:number){
        const record = this.state.datarecords[key];
        return <th>{record[colname]}</th>
      }
      private Capitalize(str: string){
        const str_t = str.toUpperCase();
        const str_tt = str_t.replace('_', ' ');
        return str_tt;
      }

      // componentDidMount() {
      //   axios.get('http://localhost:7000/employees/')
      //     .then(res => {
      //       this.setState({
      //         employees: res.data
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      // }
    
      // DataTable() {
      //   return this.state.employees.map((res: any, i: any) => {
      //     return <EmployeeTable key={i} />;
      //   });
      // }

    deleteEmployee(id: any) {
        axios.delete('http://localhost:7000/employees/delete-employee/' + id)
            .then((res) => {
                alert('Employee successfully deleted!')
                window.location.href = 'http://localhost:3000/employee-list';
            }).catch((error) => {
                console.log(error)
            })
    }

    render () {
        // return (<div className="table-wrapper">
        //   <Table striped bordered hover>
        //     <thead>
        //       <tr>
        //         <th>firstname</th>
        //         <th>lastname</th>
        //         <th>role</th>
        //         <th>email</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {this.DataTable()}
        //     </tbody>
        //   </Table>
        // </div>);

        const datarecords = this.state.datarecords;
        const each_datarecord_keys = this.state.datacolumns;
        var id  = '';
      

        return (
            
            <div>
                {datarecords.length === 0 && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered" id = "tbl">
                            <thead className="thead-light">
                              <tr>
                                {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key => 
                                  <th scope="col">{this.Capitalize(each_datarecord_key)}</th>
                                )}
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>                            
                            <tbody> 
                              {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                <tr className="rowInfo">

                                  {this.displayRecords(recordindex)} 

                                  <td>
                                    <Link className="edit-link" to={"/edit-employee/" + each_datarecord._id}>
                                      Edit
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button onClick={() => this.deleteEmployee(each_datarecord._id)} size="sm" variant="danger">Delete</Button>
                                  </td>


                                </tr>
                              )}
                              {/* <tr> 
                                <td>
                                  <Link className="edit-link" to={"/edit-student/" + }>
                                    Edit
                                  </Link>
                                  <Button size="sm" variant="danger">Delete</Button>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          )
      }
  }



export default EmployeeList;