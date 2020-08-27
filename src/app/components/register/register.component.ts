import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  user: any;
  errors: []
  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.user ={
      email: '',
      password: '',
      confPassword:'',
      firstname: '',
      lastName: '',
    };
  }
  
  // SignUp user 
  onSubmit(signUpForm: NgForm){

    // If both password matches send it to  user services for login
    if (signUpForm.value.password == signUpForm.value.confPassword){
      this._userService.signUp({
        'email': signUpForm.value.email,
        'password': signUpForm.value.password,
        'first_name': signUpForm.value.firstname,
        'last_name': signUpForm.value.lastName
      })
    }
    
  }

}
