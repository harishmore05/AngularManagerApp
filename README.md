# Manager Angular Application

This project create to Manage the Employee Records. Manager can signup and sign in to the Application and can create, update, 
delete records of employees. This project has 2 main service which are responsible for handling the API calls.

# User Service and Employee Services

## User Service

User Sevice is responsible for handling the API calls to Signin SignOut and SignUp user.

## Employee Service

Employee Service handle the api of Employees Crus Operations. Manager can create, update and delete emplyees.

# Component Section

In components, there are 6 components available with project.

1. Employee Dashboard Component which handle the UI part of Managing the employee.
2. Home Component handles home UI part.
3. Page Not Found Component which is responsible to show page not found error if routes mismatches.
4. Payment Component handle the payment UI i.e. Subscription of Manager App
5. Register Component handle signup form UI
6. SignIn Component handle SignIn form UI

## Routing

Routing is configured as follows:

1. localhost:4200/login -> To login page
2. localhost:4200/home -> To goto this page signin process needed (If authenticated user: True allowed to go Home Page, else navigate to signin page)
3. localhost:4200/register -> To signup user
4. If anything other than this url is executed then navigate to PageNotFound page

## Also, layout component handle the header footer part of UI

## Steps to follow for App up and running

1. [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md) Follow this to install angular-cli
2. Clone this repo using **git clone https://harishmore05@bitbucket.org/harishmore05/angularmanagerapp.git**
3. In terminal, go to the clonned repo dir. And Execute command: **npm install** (This will download and install the dependancies needed for this project)
4. Now all the npm packages are installed. Now run **ng serve** to run application
5. Follow **Routing** to navigate through pages.

This project is highly compatible with [This Django project](https://harishmore05@bitbucket.org/harishmore05/djangomanagerapp.git)



