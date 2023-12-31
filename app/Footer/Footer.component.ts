import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }
  shouldDisplayFooter(): boolean {
    const excludedRoutes = ['/AdminHome', '/LoginHome'];
    return !excludedRoutes.includes(this.router.url);


  }
  ngOnInit() {
  }

}
