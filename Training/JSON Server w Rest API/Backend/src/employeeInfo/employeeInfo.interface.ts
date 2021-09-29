export interface BaseEmployeeInfo {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
}
  
export interface Employee extends BaseEmployeeInfo {
    id: number;
}