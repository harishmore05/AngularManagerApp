import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions: any;
  private token: string;
  public token_expires: Date;
  public username: string;
  public errors: any = [];
  private url = 'http://127.0.0.1:8000/api/';
  public signUpSuccess: any = [];
  public loginSuccess: any = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 
                                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')) 
      }),
      
    };
  }

  public login(formData) {
    this.http.post('http://127.0.0.1:8000/api/user/login/', formData, this.httpOptions).subscribe(
      (data) => {
        this.errors = data['error'];
        if (data['error'] == null) {
          this.errors = '';
          this.loginSuccess = 'Login Successful';
          localStorage.setItem('user', JSON.stringify(data['user']));
          localStorage.setItem('token', JSON.stringify(data['token']));
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

  public signUp(user) {
    console.log('User to be SignUp: ', user);
    this.http
      .post(
        'http://127.0.0.1:8000/api/user/',
        JSON.stringify(user),
        this.httpOptions
      )
      .subscribe(
        (data) => {
          this.signUpSuccess = 'SignUp Successfull';
          this.router.navigate(['/login'], { relativeTo: this.route });
          this.resetVar();
        },
        (err) => {
          console.log(err['error']);
        }
      );
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login'], { relativeTo: this.route });
    this.resetVar();
  }

  public isAuthenticatedUser() {
    if (JSON.parse(localStorage.getItem('token'))) {
      return true;
    } else {
      return false;
    }
  }

  public resetVar() {
    this.loginSuccess = '';
    this.errors = '';
    this.signUpSuccess = '';
  }
}
