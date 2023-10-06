import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Shared/auth.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string|null='';
    constructor(private auth:AuthService) {
      this.auth.username$.subscribe((username: string) => {
        this.name = username;
      });

  }



  ngOnInit() {
if(this.isLoggedin()){
  const uname=sessionStorage.getItem('username')
  if(uname!=null){
    this.auth.login(uname);
  }
}

  }
  clear(){
    this.auth.logout();
  }
  isLoggedin(){

    return this.auth.isLoggedin()
  }
  isAdmin(){
    return this.auth.isAdmin()

  }

}
