import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employees: any = []
  private httpOptions: any;
  public errors: any = []
  public addEmpSuccess:any = []
  public updatedEmployee: any

  constructor(private http: HttpClient) {
    // Http Header
    this.httpOptions ={
      headers : new HttpHeaders({"Content-Type": "application/json",
                                  'Authorization': 'Basic ' + btoa('harishmore05@gmail.com:12345')})
    }
  }
  
  // Request for all Employees details to Django Server
  public getEmployeeData(){
    this.http.get('http://127.0.0.1:8000/api/employee/', this.httpOptions)
    .subscribe(
      data => {
        this.employees = data;
      },
      err =>{
        console.log("Error: ", err['error'])
      }
    )
  }
  
  // Add New Employee
  public addNewEmployee(formData){
    this.http.post('http://127.0.0.1:8000/api/employee/', JSON.stringify(formData), this.httpOptions)
    .subscribe(
      data => {
          if(data){
            this.errors = ''
            this.addEmpSuccess = 'Employee Added Sucessfully'
          }
      },
      err => {
        if (err){
          this.addEmpSuccess =''
          this.errors = err['error']['email']
          console.log("Error: ", err['error']['email'])
        }
      }
    )
  }
  
  // Delete Employee
  public deleteEmployee(id: any){
    this.http.delete('http://127.0.0.1:8000/api/employee/'+String(id)+'/', this.httpOptions)
    .subscribe(
      err=>{
        console.log(err)
      }
    )
    const indexOfEmployee = this.employees.findIndex(
      employees => employees.id === employees.url.split("/").slice(-2)[0]
    );
    console.log('Index of employees : ', indexOfEmployee)
    this.employees.splice(indexOfEmployee, 1)
  }

  // Uodate Employee method
  public updateEmployee(id: any, employee: any){
    console.log('Stringfied Object Emp:', JSON.stringify(employee))
    this.http.patch('http://127.0.0.1:8000/api/employee/'+String(id)+'/', JSON.stringify(employee), this.httpOptions)
    .subscribe(
      data => {
        this.updatedEmployee = data['success'];
        console.log("Successfully Updated", this.updateEmployee)
      },
      err => {
        console.error('Error while updating: ', err['error'])
      }
    )
  }
  
}
