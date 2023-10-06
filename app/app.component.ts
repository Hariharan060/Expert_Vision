import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ExpertVision';
targetTime: string = '2023-06-29T00:02:00';
constructor(
  private router: Router,
  private activatedRoute:ActivatedRoute,
 ) {}

  ngOnInit(){
this.Time();
  }

  displayHeaderandFooter(): boolean {
    const excludedRoutes = ['/Home', '/LoginHome', '/login', '/SignUp', '/About', '/Contact', '/Help', '/profile','/AdminHome','/NewPost'];
    return !excludedRoutes.includes(this.router.url);
  }

Time(){
  const Time = new Date(this.targetTime).getTime();
  const currentTime = new Date().getTime();
 const duration=1* 60 * 1000;
  if (currentTime >= Time && currentTime <= Time+duration) {
    const contentArea=document.getElementById("content-area")
    if (contentArea) {
      contentArea.style.paddingTop = "130px";
    }
  }
  const completedtime = Time + duration - currentTime;
  setTimeout(() => {
    const contentArea=document.getElementById("content-area")
    if (contentArea) {
      contentArea.style.paddingTop = "75px";
    }

  }, completedtime);

}

  }

