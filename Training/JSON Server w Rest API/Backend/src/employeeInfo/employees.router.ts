/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as EmployeeService from "./employees.service";
 import { BaseEmployeeInfo, Employee } from "./employeeInfo.interface";

 import { SavedEmpDocument, employeeSchemaModel, EmployeeSchema } from "../../db/db.model";
 import { MongoClient } from "mongoose/node_modules/mongodb";
 const db = require("../../db/db.index");
 /**
 * Router Definition
 */
 export const employeesRouter = express.Router();


 /**
 * Controller Definitions
 */

// GET employees

function getAllPosts(request: express.Request, response: express.Response) {
  employeeSchemaModel.find()
    .then(posts => {
      response.send(posts);
    })
}

employeesRouter.route('/').get(async (req: Request, res: Response) => {
    try {
      const items: Employee[] = await EmployeeService.findAll();
      //res.status(200).send(items);

      getAllPosts(req,res);

    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
  

// GET employees/:id


async function getPostById(request: express.Request, response: express.Response) {
  var ObjectId = require('mongodb').ObjectId; 
  var id = request.params.id;       
  var o_id = new ObjectId(id);
  //db.test.find({_id:o_id});
  //response.status(501).send(o_id);


  try {
   let post= await employeeSchemaModel.findById(id)
    // .then(post => {
    //   response.send(post);
    // }).catch((error) => console.log(error)).finally(() => console.error("blahjjfasf"))
    if(post){
      response.status(200).send(post);
    }
    else{
      response.status(404).send(id + " not found");
    }
  } catch (error) {
    response.status(500).send(error);
  }
}

employeesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Employee = await EmployeeService.find(id);
  
      // if (item) {
      //   return res.status(200).send(item);
      // }
  
      // res.status(404).send("Employee not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
    getPostById(req,res);
});
  
  
// POST employees  

employeesRouter.route('/create-employee').post(async (req: Request, res: Response) => {
    try {
      const emp: BaseEmployeeInfo = req.body;

      const newEmp = await EmployeeService.create(emp);
  
      //res.status(201).json(newEmp);

      const employee = new employeeSchemaModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        email: req.body.email
      })
      //var id = new Date().valueOf();
      const { firstname, lastname, role, email }: SavedEmpDocument = await employee.save();
      
        return res.status(200).send({   
            firstname,
            lastname,
            role,
            email,
            message: 'Employee created'
        })


    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
  
// PUT employees/:id  
async function updateId(request: express.Request, response: express.Response) {
  var id = request.params.id;
  console.log(id);       
  const postData: Employee = request.body;
  try {
   let post= await employeeSchemaModel.findByIdAndUpdate(id, postData, {new:true});
    if(post){
      response.status(200).send(post);
    }
    else{
      response.status(404).send(id + " not found");
    }
  } catch (error) {
    response.status(500).send(error);
  }
}
employeesRouter.route('/edit-employee/:id').put(async (req: Request, res: Response) => {
    //const id: number = parseInt(req.params.id, 10);
  
    try {
      //const empUpdate: Employee = req.body;
  
      // const existingEmp: Employee = await EmployeeService.find(id);
  
      // if (existingEmp) {
      //   const updatedEmp = await EmployeeService.update(id, empUpdate);
      //   return res.status(200).json(updatedEmp);
      // }
      
      // const newEmp = await EmployeeService.create(empUpdate);
  
      // res.status(201).json(newEmp);
      

      updateId(req,res);

    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
  
  
// DELETE employees/:id  
async function deleteId(request: express.Request, response: express.Response) {
  var id = request.params.id;    
  try {
   let post= await employeeSchemaModel.findByIdAndDelete(id);
    if(post){
      response.status(200).send("post deleted");
    }
    else{
      response.status(404).send(id + " not found");
    }
  } catch (error) {
    response.status(500).send(error);
  }
}
employeesRouter.route('/delete-employee/:id').delete(async (req: Request, res: Response) => {
    try {
      // const id: number = parseInt(req.params.id, 10);
      // await EmployeeService.remove(id);
      //res.sendStatus(204);
      deleteId(req,res);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
