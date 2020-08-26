import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthencticatedUser: boolean;
  public user: any;
  constructor(public _empService: EmployeeService, private _userService: UserService) { }

  ngOnInit(): void {
    this.isAuthencticatedUser = this._userService.isAuthenticatedUser()
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  onSubmit(formData: NgForm){
    this._empService.addNewEmployee({
      "email": formData.value.email,
      "first_name": formData.value.first_name,
      "last_name": formData.value.last_name,
      "company" : formData.value.company,
      "mobile": formData.value.mobile,
      "city": formData.value.city,
    })
  }

  logout(){
    this._userService.logout()
  }

}
