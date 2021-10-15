/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as EmployeeService from "./employees.service";
 import { BaseEmployeeInfo, Employee } from "./employeeInfo.interface";

 import { SavedEmpDocument, employeeSchemaModel, EmployeeSchema } from "../../db/db.model";
 const db = require("../../db/db.index");
 /**
 * Router Definition
 */
 export const employeesRouter = express.Router();


 /**
 * Controller Definitions
 */

// GET employees
function getAllPosts(request: express.Request, response: express.Response, empList:any[]) {
  employeeSchemaModel.find()
    .then(posts => {
      response.send(posts);
      empList = posts;
    })
}

employeesRouter.route('/').get(async (req: Request, res: Response) => {
    try {
      const items: Employee[] = await EmployeeService.findAll();
      //res.status(200).send(items);

      var empList:any = [];
      getAllPosts(req,res,empList);

    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
  

// GET employees/:id
async function getPostById(request: express.Request, response: express.Response) {
  var ObjectId = require('mongodb').ObjectId; 
  var id = request.params.id;       

  try {
   let post= await employeeSchemaModel.findById(id);

    if(post){
      const data = JSON.stringify(post);

      response.status(200).send(data);
    } else {
      response.status(404).send(id + "Employee not found");
    }
  } catch (error) {
    response.status(500).send(error);
  }
}

employeesRouter.route("/:id").get(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
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

      const userExists = await employeeSchemaModel.exists({ firstname: req.body.firstname, lastname: req.body.lastname });
      if (userExists) console.log("User exists");
      else console.log("User does not exist");
      const emailExists = await employeeSchemaModel.exists({ email: req.body.email });

      if(userExists){
        throw new Error('This employee already exists!');
      }
      else if(emailExists){
        throw new Error('This email is taken. Please use another email.');
      }
      else{
        const { firstname, lastname, role, email }: SavedEmpDocument = await employee.save();
      
        return res.status(200).send({   
            firstname,
            lastname,
            role,
            email,
            message: 'Employee created'
        })
      }
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
  
// PUT employees/:id  
async function updateId(request: express.Request, response: express.Response) {
  var id = request.params.id;
  console.log(id);       
  //const postData: Employee = request.body;
  try {
      const userExists = await employeeSchemaModel.exists({ firstname: request.body.firstname, lastname: request.body.lastname });
      const emailExists = await employeeSchemaModel.exists({ email: request.body.email });

      if(userExists){
        const findId:any[] = await employeeSchemaModel.find({firstname: request.body.firstname, lastname: request.body.lastname})
        var temp_id = findId[0]._id;
        if(id != temp_id){
          throw new Error("Can not update another employee's information");
        }
        if(emailExists){
          await findIdByEmail(request, response, id);
        }
        await finalUpdate(request, response, id);
      }
      else if(emailExists){
        await findIdByEmail(request, response, id);
        await finalUpdate(request, response, id);
      }
      else{
        await finalUpdate(request, response, id);
      }
    
  } catch (e:any) {
    response.status(500).send(e.message);
  }
}

async function findIdByEmail(request: express.Request, response: express.Response, id:string) {
  const findIdEmail:any[] = await employeeSchemaModel.find({email: request.body.email})
  var temp_id = findIdEmail[0]._id;
  if(id != temp_id){
    throw new Error("Can not update another employee's information");
  }
}

async function finalUpdate(request: express.Request, response: express.Response, id:string){
  const postData: Employee = request.body;
  let post= await employeeSchemaModel.findByIdAndUpdate(id, postData, {new:true});
  if(post){
    response.status(200).send(post);
  }
  else{
    response.status(404).send(id + " not found");
  }
}

employeesRouter.route('/edit-employee/:id').put(async (req: Request, res: Response) => {
    try {
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
      deleteId(req,res);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});
