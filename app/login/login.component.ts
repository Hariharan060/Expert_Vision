import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

title="Angular";
UserName:string="";
Password:string="";
userdetail:any;
constructor(private auth:AuthService,private router:Router) {
}


ngOnInit() {

}
login(){
  if(this.UserName==='Admin'&& this.Password==='Admin01'){
    sessionStorage.setItem("username",this.UserName);
    this.router.navigate(['/AdminHome']);
return;
  }
 this.auth.getUser()
  .subscribe(response=> {
    this.userdetail=response;
    let flag=0;
    for(var user of this.userdetail){
    if(user.Password===this.Password){
flag=1
        sessionStorage.setItem("username",user.UserName);
        let name=sessionStorage.getItem("username");
        if(name!=null)
        this.auth.login(name);
        this.router.navigate(['/LoginHome']);

    }

  }
if(flag==0){

      alert("Invalid username or password");
      this.UserName="";
      this.Password="";

}


  }

    );


}
}

