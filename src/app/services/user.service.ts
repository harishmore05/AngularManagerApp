import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions: any;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  public signUpSuccess: any = [];
  public loginSuccess: any = [];
  public logoutSuccess: any = [];
  public logoutError: any = [];

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      
    };
  }
  
  // Login request to Django server
  public login(formData) {
    // console.log("Form Data: ", formData)
    this.http.post('http://127.0.0.1:8000/api/user/login/', formData).subscribe(
      (data) => {
        this.errors = data['error'];
        if (data['error'] == null) {
          this.errors = '';
          this.loginSuccess = 'Login Successful';

          // Display toastr message of login Success
          this.toastr.success('Login Successful')

          // save token and user in local storage for further user
          localStorage.setItem('user', JSON.stringify(data['user']));
          localStorage.setItem('token', JSON.stringify(data['token']));
          
          // navigate to home after login
          this.router.navigate(['/home'], { relativeTo: this.route });
        } else {
          this.loginSuccess = '';
        }
      },
      (err) => {
        this.errors = err['error'];
      }
    );
  }
  
  // SignUp request to django server
  public signUp(user) {
    console.log('User to be SignUp: ', user);
    this.http.post('http://127.0.0.1:8000/api/user/', JSON.stringify(user), this.httpOptions)
    .subscribe(
      (data) => {
        this.signUpSuccess = 'SignUp Successful';
        this.toastr.success("SignUp Successful")

        // After successful signup navigate to login page
        this.router.navigate(['/login'], { relativeTo: this.route });
        // Reset all success and error messages
        this.resetVar();
      },
      (err) => {
        console.log(err['error']);
      }
    );
  }


  public logout(id: any) {
    // Clear out local storage after logout
    
    this.http.get('http://127.0.0.1:8000/api/user/logout/'+ String(id) +'/')
    .subscribe(
      (data) => {
        this.logoutSuccess = data['success'];
        this.toastr.success('SignOut Successful')
        // After successful logout navigate to login page
        this.router.navigate(['/login'], { relativeTo: this.route });
        // Reset all success and error messages
        this.resetVar();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      },
      (err) => {
        this.logoutError = err['error']
      }
    );

    // Naviagte to login page
    this.router.navigate(['/login'], { relativeTo: this.route });
    this.resetVar();
  }

  public isAuthenticatedUser() {
    // Authenticate user local storage has token/user available or not
    if (JSON.parse(localStorage.getItem('token'))) {
      return true;
    } else {
      return false;
    }
  }
  
  // Reset Varible methods
  public resetVar() {
    this.loginSuccess = '';
    this.errors = '';
    this.signUpSuccess = '';
  }
}
