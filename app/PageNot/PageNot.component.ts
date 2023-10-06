import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-PageNot',
  templateUrl: './PageNot.component.html',
  styleUrls: ['./PageNot.component.css']
})
export class PageNotComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) {}

  ngOnInit() {

  }
  home(){
    console.log(this.auth.isLoggedin());
    if(this.auth.isLoggedin()){
      this.router.navigate(['LoginHome']);
    }
    else{
    this.router.navigate(['Home']);
    }
  }

}
