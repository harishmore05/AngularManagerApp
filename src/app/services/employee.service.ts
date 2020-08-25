import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employees:Employee = []
  private httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions ={
      headers : new HttpHeaders({"Content-Type": "application/json",
                                  'Authorization': 'Basic ' + btoa('harishmore05@gmail.com:12345')})
    }
  }

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
  
}
