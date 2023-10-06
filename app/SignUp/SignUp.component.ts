import { AuthService } from '../Shared/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import{user} from '../Shared/model'
import { Router } from '@angular/router';
@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

Signup!:FormGroup;
 usermodelobj:user=new user();
Country:any=[
  { value: 'Argentina', name: 'Argentina' },
  { value: 'Australia', name: 'Australia' },
  { value: 'Austria', name: 'Austria' },
  { value: 'Belgium', name: 'Belgium' },
  { value: 'Brazil', name: 'Brazil' },
  { value: 'Canada', name: 'Canada' },
  { value: 'Chile', name: 'Chile' },
  { value: 'China', name: 'China' },
  { value: 'Colombia', name: 'Colombia' },
  { value: 'Denmark', name: 'Denmark' },
  { value: 'Egypt', name: 'Egypt' },
  { value: 'Finland', name: 'Finland' },
  { value: 'France', name: 'France' },
  { value: 'Germany', name: 'Germany' },
  { value: 'Greece', name: 'Greece' },
  { value: 'Hungary', name: 'Hungary' },
  { value: 'India', name: 'India' },
  { value: 'Indonesia', name: 'Indonesia' },
  { value: 'Ireland', name: 'Ireland' },
  { value: 'Italy', name: 'Italy' },
  { value: 'Japan', name: 'Japan' },
  { value: 'Malaysia', name: 'Malaysia' },
  { value: 'Mexico', name: 'Mexico' },
  { value: 'Netherlands', name: 'Netherlands' },
  { value: 'New Zealand', name: 'New Zealand' },
  { value: 'Norway', name: 'Norway' },
  { value: 'Pakistan', name: 'Pakistan' },
  { value: 'Philippines', name: 'Philippines' },
  { value: 'Poland', name: 'Poland' },
  { value: 'Portugal', name: 'Portugal' },
  { value: 'Romania', name: 'Romania' },
  { value: 'Russia', name: 'Russia' },
  { value: 'Saudi Arabia', name: 'Saudi Arabia' },
  { value: 'Singapore', name: 'Singapore' },
  { value: 'Slovakia', name: 'Slovakia' },
  { value: 'South Africa', name: 'South Africa' },
  { value: 'South Korea', name: 'South Korea' },
  { value: 'Spain', name: 'Spain' },
  { value: 'Sweden', name: 'Sweden' },
  { value: 'Switzerland', name: 'Switzerland' },
  { value: 'Taiwan', name: 'Taiwan' },
  { value: 'Thailand', name: 'Thailand' },
  { value: 'Turkey', name: 'Turkey' },
  { value: 'Ukraine', name: 'Ukraine' },
  { value: 'United Kingdom', name: 'United Kingdom' },
  { value: 'United States', name: 'United States' },
  { value: 'Vietnam', name: 'Vietnam' }
];

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }

Gender=[
  {id:"1", value:"Male"},
  {id:"2", value:"Female"},
  {id:"3", value:"Other"}
]
  ngOnInit() {
    this.Signup=this.fb.group({
      Name : ['',Validators.required],
      UserName: ['',Validators.pattern("[a-zA-Z0-9]{3,15}$")],
      Email: ['',Validators.email],
      Password:['',Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')],
      Country:['India'],
      Gender:['Male']
    })

  }

  get SignupFormControl() {
    return this.Signup.controls;
  }
postUserDetail(){
   this.usermodelobj.Name=this.Signup.value.Name;

   this.usermodelobj.UserName=this.Signup.value.UserName;

   this.usermodelobj.Email=this.Signup.value.Email;

   this.usermodelobj.Password=this.Signup.value.Password;

   this.usermodelobj.Country=this.Signup.value.Country;

   this.usermodelobj.Gender=this.Signup.value.Gender;

   this.auth.postUser(this.usermodelobj)
    .subscribe({
     next:response=>{

      this.router.navigate(["login"]);
    },
     error:error=>alert("Something went wrong")
    });
}
}

