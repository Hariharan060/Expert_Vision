import { BehaviorSubject, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
displayUserPost: any;

constructor(private http:HttpClient,private router:Router) { }
//json file methods
private usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
public username$: Observable<string> = this.usernameSubject.asObservable();
apiurl: string = environment.apiUrl; //url from environment file

postUser(data:any){
  return this.http.post<any>(this.apiurl+"/SignupUser",data)

}

getUserDetail(name:string){
  return this.http.get<any>(this.apiurl+"/SignupUser?UserName="+name)
}
getUser(){
  return this.http.get<any>(this.apiurl+"/SignupUser")

}
postbyUser(data:any){

  return this.http.post<any>(this.apiurl+"/posts",data)

}
getPosts(){
  return this.http.get<any>(this.apiurl+"/posts")

}
getPost(name:string){
  return this.http.get<any>(this.apiurl+"/posts?Name="+name)

}
postComment(data:any){
  return this.http.post<any>(this.apiurl+"/Comments",data)

}
getComment(id:number){
  return this.http.get<any>(this.apiurl+"/Comments?ParentId="+id)

}
postReply(data:any){
  return this.http.post<any>(this.apiurl+"/Reply",data)

}
getReply(id:number){
  return this.http.get<any>(this.apiurl+"/Reply?ParentId="+id)

}

postlike(id: number, like: number,likedby:string[]) {
  return this.http.patch<any>(this.apiurl+"/posts/"+id,{ likes: like,likedby:likedby })

}
commentLike(id: number, like: number,likedby:string[]) {
  return this.http.patch<any>(this.apiurl+"/Comments/"+id,{ likes: like,likedby:likedby })

}
updateEmail(id:number,email:string) {
  console.log(id+""+email)
  return this.http.patch<any>(this.apiurl+"/SignupUser/"+id,{ Email:email })
}
updateName(id:number,name:string) {
  return this.http.patch<any>(this.apiurl+"/SignupUser/"+id,{ Name:name })
}
updateCountry(id:number,country:string) {
  return this.http.patch<any>(this.apiurl+"/SignupUser/"+id,{ country:country })

}
deletePost(id: number) {
return this.http.delete<any>(this.apiurl+"/posts/"+id)
}

pin(id: number, Pinned:boolean) {
  return this.http.patch<any>(this.apiurl+"Comments/"+id,{ pinned:Pinned })
    .pipe(
      map((res: any) => res)
    );
}
uploadImage(image:string,id:number) {


  return this.http.patch<any>(this.apiurl+"/SignupUser/"+id,{ ImageUrl:image })
}
getImage(){
  return this.http.get<any>(this.apiurl+"/Images")

}
updateImage(image:string,id:number) {


  return this.http.patch<any>(this.apiurl+"/Images/"+id,{ ImageUrl:image })
}
pincount(id: number, pincount:number) {
  return this.http.patch<any>(this.apiurl+"/posts/"+id,{ pinned:pincount })

}


//guard methods
isLoggedin(){
  if(sessionStorage.getItem('username')!=null&&sessionStorage.getItem('username')!='Admin'){
    return true;
  }
  return false;
}
isAdmin(){
  if(sessionStorage.getItem('username')==='Admin'){
    return true;
  }
  return false;
}

login(username: string): void {
  this.usernameSubject.next(username);
}

logout(): void {
  // Perform logout logic
  sessionStorage.clear();
  this.usernameSubject.next('');
  this.router.navigate(['Home'])
}
}
