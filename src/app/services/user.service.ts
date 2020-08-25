import { User } from './../models/signInData';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private httpOptions: any;
  private token: string;
  public token_expires: Date;
  public username: string;
  public errors: any= [];
  private url = 'http://127.0.0.1:8000/api/';
  public signUpSuccess: any = []
  public loginSuccess: any = []
  private isAuthenticated = false;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    };
  }
  
  // public login(signInData: SignInData){
  public login(formData){
    // console.log('User : ', formData)
    this.http.post('http://127.0.0.1:8000/api/user/login/', formData)
    .subscribe(
      data => {
          // console.log('Token: ', data['user'])
          this.updateData(data['token'])
          // console.log('Error: ', data['error']);
          this.errors = data['error']
          if(data['error'] == null){
            this.errors = ''
            this.loginSuccess = 'Login Successful'
            this.router.navigate(['/home'], { relativeTo: this.route });
          }
          else{
            this.loginSuccess = ''
          }
      },
      err => {
        // console.log(err['error']);
        this.errors = err['error'];
      }
    );
  }
    
  public signUp(user){
    console.log('User to be SignUp: ', user)
    this.http.post('http://127.0.0.1:8000/api/user/', JSON.stringify(user), this.httpOptions)
    .subscribe(
      data => {
        // console.log(data['first_name'])
        this.signUpSuccess = 'SignUp Successfull'
        this.router.navigate(['/login'], { relativeTo: this.route });
      },
      err=> {
        console.log(err['error']);
      }
    )
  }


  public refreshToken(){
    this.http.post(this.url+'/api-token-refresh/', JSON.stringify({token: this.token}))
    .subscribe(
      data => {
        this.updateData(data['token']);
      }
    );
  }

  public logout(){
    this.token=null;
    this.token_expires = null;
    this.username = null;
  }
  
  public isAuthenticatedUser(){
    if(this.isAuthenticated){
      return true
    }
    return false
  }

  private updateData(token){
    this.token = token;
    this.isAuthenticated = true;
    this.errors = [];
    
    // // decode token to read the username and expiry time
    // const token_parts = this.token.split(/|./);
    // const token_decoded=JSON.parse(window.atob(token_parts[1]));
    // this.token_expires = new Date(token_decoded.exp*1000);
    // this.username = token_decoded.username
  }
}
