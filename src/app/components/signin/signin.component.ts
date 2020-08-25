import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  public user: any;

  constructor (public _userService: UserService) { }

  ngOnInit(): void {
    this.user ={
      email: '',
      password: '',
    };
  }
  

  onSubmit(signInForm: NgForm){
    this.user.email = signInForm.value.email;
    this.user.password = signInForm.value.password;
    console.log("User :", signInForm.value.email)
    let formData = new FormData()
    formData.append("email", signInForm.value.email)
    formData.append("password", signInForm.value.password)
    this._userService.login(formData)
  }

}
