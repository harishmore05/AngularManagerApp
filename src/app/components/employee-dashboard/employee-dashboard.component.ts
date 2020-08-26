import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  public id: any
  public email: any
  public first_name: any
  public last_name: any
  public city: any
  public mobile: any
  public company: any

  constructor(public _empService: EmployeeService, private modalService: NgbModal) {
  }


  ngOnInit() {
    this._empService.getEmployeeData()
  }
  
  onDelete(employee){
    console.log(employee.url.split("/").slice(-2)[0])
    this._empService.deleteEmployee(employee.url.split("/").slice(-2)[0])
  }

  openModal(targetModal, employee) {
    this.modalService.open(targetModal, {
     centered: false,
    });
    // console.log("From Open mmodal ",employee.email)
    this.id = employee.url.split("/").slice(-2)[0]
    this.email = employee.email
    this.first_name = employee.first_name
    this.last_name = employee.last_name
    this.city = employee.city
    this.mobile = employee.mobile
    this.company = employee.company
  }

  onSubmit(updateForm: NgForm){
    console.log("From Form: ", updateForm.value.id)
    this._empService.updateEmployee(updateForm.value.id, {
      'email': updateForm.value.email,
      'first_name': updateForm.value.first_name,
      'last_name': updateForm.value.last_name,
      'city': updateForm.value.city,
      'mobile': updateForm.value.mobile,
      'company': updateForm.value.company
    })
  }
}