import { ObjectId } from "mongodb";
import * as mongoose from "mongoose";
import {model} from "mongoose";

export const EmployeeSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true }
});

export interface SavedEmpDocument extends Document {
  firstname: string;
  lastname: string;
  role: string;
  email: string;
}

export const employeeSchemaModel = model<SavedEmpDocument>('employee', EmployeeSchema)

export interface EmployeeDB extends SavedEmpDocument {
  id: ObjectId;
}


// module.exports = ((mongoose: any) => {
//     const EmployeeDB = mongoose.model(
//       "employeedb",
//       mongoose.Schema(
//         {
//           firstname: String,
//           lastname: String,
//           role: String,
//           email: String
//         },
//         { timestamps: true }
//       )
//     );
  
//     return EmployeeDB;
//   });