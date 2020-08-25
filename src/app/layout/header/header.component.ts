import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public isAuthencticatedUser: boolean;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.isAuthencticatedUser = this._userService.isAuthenticatedUser()
  }

}
