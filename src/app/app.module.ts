import { EmployeeService } from 'src/app/services/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// MDB Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Material Design
// import {MatDialog} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PaymentComponent } from './components/payment/payment.component';

// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    EmployeeDashboardComponent,
    PageNotFoundComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatIconModule,
  ],
  providers: [UserService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
