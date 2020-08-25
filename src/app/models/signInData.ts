export class User{
    constructor(
        private user: string = '',
        private pass: string = ''){
    }
    public get username(){
        return this.user;
    }
    public get password(){
        return this.pass;
    }
    public set username(user: string){
        this.user = user;
    }
    public set password(pass: string){
        this.pass = pass
    }
}