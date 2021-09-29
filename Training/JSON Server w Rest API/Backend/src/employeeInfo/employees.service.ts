/**
 * Data Model Interfaces
 */
 import { BaseEmployeeInfo, Employee } from "./employeeInfo.interface";
 import { Employees } from "./employees.interface";

 import { SavedEmpDocument, employeeSchemaModel, EmployeeDB } from "../../db/db.model";
 import {DBemployees} from "../../db/db.interface";

// const db = require("../db/db.index");

// const Employee = db.model;

/**
 * In-Memory Store
 */
let employees: Employees = {
    1: {
        id: 1,
        firstname: "Steve",
        lastname: "Palmer",
        role: "Softwre Developer",
        email: "steve@tcs.com"
    },
    2: {
        id: 2,
        firstname: "Ann",
        lastname: "Smith",
        role: "Software Developer",
        email: "ann@tcs.com"
    },
    3: {
        id: 3,
        firstname: "James",
        lastname: "Maddison",
        role: "Solution Architect",
        email: "james@tcs.com"
      }
};

/**
 * Service Methods
 */

//FIND all employees
 export const findAll = async (): Promise<Employee[]> => Object.values(employees);


//FIND employee with an id
 export const find = async (id: number): Promise<Employee> => employees[id];


//CREATE an employee
export const create = async (newItem: BaseEmployeeInfo): Promise<Employee> => {
    const id = new Date().valueOf();
  
    employees[id] = {
      id,
      ...newItem,
    };

    return employees[id];
};

//UPDATE an employee
export const update = async (
    id: number,
    employeeInfoUpdate: BaseEmployeeInfo
  ): 
  Promise<Employee | null> => {
    const employeeFind = await find(id);
  
    if (!employeeFind) {
      return null;
    }
  
    employees[id] = { id, ...employeeInfoUpdate };
  
    return employees[id];
};


//DELETE an employee
export const remove = async (id: number): Promise<null | void> => {
    const empInfo = await find(id);
  
    if (!empInfo) {
      return null;
    }
  
    delete employees[id];
};