
export  class user{


       id:number=0;
      Name:string='';
      UserName:string='';
      Email:string='';
      Password: string='';
      Country:string='';
      Gender:string='';
      Data:string='';
      type='';
}





export class UserComment{

  id:number=0
Name:string|null='';
ParentId:number=0;
Comment:string='';
likes:number= 0;
isButtonOpen:boolean= false;
likedby:string[]=[''];
pinned: boolean = false;

}



export class UserPost{
  id:number =0;
  Name:string='';
  Title:string='';
  Message:string='';
  isButtonOpen:boolean= false;
  likes:number= 0;
  likedby:string[]=[''];
  pinned:number=0;
}

export class Reply{
  id:number =0;
  Name:string|null='';
  ParentId:number=0;
  Message:string='';


}
