import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import _ from 'lodash';
import { EmployeeIStates } from './EmployeeInterfaceStates';

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');


class EmployeeList extends Component<RouteComponentProps,EmployeeIStates> {

    constructor(props: RouteComponentProps) {
        super(props)
        this.myHandler = this.myHandler.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.state = {
          datarecords: [],
          datacolumns: []
        };
      }
    

      //Methods
      componentWillMount(): void {const api_url = 'http://localhost:7000/employees/';
        axios.get(api_url).then(response => {
        this.setState({datarecords: response.data});
        this.extractColumnNames();
        });
        document.body.removeEventListener('click', this.myHandler);
      }

      private myHandler(id: any) {
        console.log (id);
        window.location.href = 'http://localhost:3000/edit-employee/'+ id;
      }

      private extractColumnNames() {
        const firstrecord = _.keys(this.state.datarecords[0]);
        var location = firstrecord.indexOf("__v");
        delete firstrecord[location];
        console.log(firstrecord);
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

    render () {
        const datarecords = this.state.datarecords;
        const each_datarecord_keys = this.state.datacolumns;
        const paginationOption = {
          custom: true,
          totalSize: datarecords.length
        }

        return (
            
            <div>
                {datarecords.length === 0 && (
                    <div className="text-center">
                        <h2>No datarecords found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered" id = "tbl" >
                            <thead className="thead-light">
                              <tr>
                                {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key => 
                                  <th scope="col">{this.Capitalize(each_datarecord_key)}</th>
                                )}
                                {/* <th scope="col">Actions</th> */}
                              </tr>
                            </thead>                            
                            <tbody> 
                              {datarecords && datarecords.map((each_datarecord, recordindex) =>
                                
                                <tr className="rowInfo" onClick={()=>this.myHandler(each_datarecord._id)}>

                                  {this.displayRecords(recordindex)} 

                                  {/* <td>
                                    <Link className="edit-link" to={"/edit-employee/" + each_datarecord._id}>
                                      Edit
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button onClick={() => this.deleteEmployee(each_datarecord._id)} size="sm" variant="danger">Delete</Button>
                                  </td> */}

                                </tr>
                              )}
                            </tbody>
                          </table>
                      </div>
                  </div>
                  {/* <PaginationProvider pagination={ paginationFactory(paginationOption) }>
                    {
                      ({
                        paginationProps,
                        paginationTableProps
                      }) => (
                      <div>
                        <SizePerPageDropdownStandalone
                        { ...paginationProps }
                        />
                        <PaginationTotalStandalone
                          { ...paginationProps }
                        />
                        {/* <BootstrapTable
                          keyField="id"
                          data={ products }
                          columns={ columns }
                          { ...paginationTableProps }
                        /> */}
                        {/*<PaginationListStandalone
                          { ...paginationProps }
                        />
                      </div>
                      )
                    }
                  </PaginationProvider> */}
              </div>
          )
      }
  }



export default EmployeeList;