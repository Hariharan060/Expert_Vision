import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Reply, UserComment } from '../Shared/model';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:string|null=sessionStorage.getItem('username')||null;
  displayUserPost: any;
  UserDetail:any;
  modalTitle: string = '';
  displayUserComment: any;
  showEditIcon = false;
  reply:Reply=new Reply();

update: any;
  displayreply: any;
  constructor(private auth:AuthService,private fb:FormBuilder) { }

  ngOnInit() {
    this.displayPost();
    this.displayUser();
    this.update=this.fb.group({
Name: [''],
Country: [''],
Email: ['']
    });
  }





  toggleButton(postId: number) {
    const post = this.displayUserPost.find((p: { id: number })=> p.id === postId);
    if (post) {
      post.isButtonOpen= !post.isButtonOpen;
    }
  }
  toggle(commentId: number) {
    const comment= this.displayUserComment.find((c: { id: number })=> c.id === commentId);
    if (comment) {
      comment.isButtonOpen= !comment.isButtonOpen;
    }
  }

  displayPost(){
    if(this.name!=null){
    this.auth.getPost(this.name)
     .subscribe(response=> {
       this.displayUserPost=response;
     });

   }
  }
  displayUser(){
    if(this.name!=null){
      this.auth.getUserDetail(this.name)
       .subscribe(response=> {
         this.UserDetail=response;
       });

     }
  }
  postComments: { [postId: number]: UserComment[] } = {};

  displayComment(Id:number){
    const postId=Id
    this.auth.getComment(postId)
    .subscribe({next:(response:UserComment[])=> {
      this.postComments[postId] = response;

      this.displayUserComment=response;
      this.postComments[postId].sort((a: { pinned: any; }, b: { pinned: any; }) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    error:error=> {console.error(error);
      alert("Something went wrong")
      }

  }

    );
}
input: { [parentId: string]: string } = {};

postReply(commentId:number){

  this.reply.ParentId=commentId;
  this.reply.Message=this.input[commentId];
  this.reply.Name=this.name;
  this.auth.postReply(this.reply)
      .subscribe({
       next:response=>{
        this.input[commentId]='';
   this.displayReply(commentId)
      },
       error:error=> {console.error(error);
       alert("Something went wrong")
       }

      });
    }

postReplys: { [commentId: number]: Reply[] } = {};

        displayReply(commentId:number){

          this.auth.getReply(commentId)
          .subscribe({next:response=> {
            this.postReplys[commentId]=response;
            this.displayreply=response;
          },
          error:error=> {console.error(error);
            alert("Something went wrong")
            }

        }

          );
        }
@ViewChild('textElement') textElement!: ElementRef;

  showEditOption: any = {};

  showEdit(field: string) {
    this.showEditOption[field] = true;
  }

  hideEdit(field: string) {
    this.showEditOption[field] = false;
  }
  openModal(title: string) {
    this.modalTitle = title;
  }
  edit(){
if( this.modalTitle==='Edit Email'){
  return 'Email';
}
else if(this.modalTitle==='Edit Name'){
return 'Name'
  }
  return 'Country'
}
updateDetail(id:number){
  let reference=document.getElementById('cancel');

  if( this.modalTitle==='Edit Email'){
    this.auth.updateEmail(id,  this.update.value.Email)
    .subscribe({
      next: response => {
        reference?.click();

        this.displayUser();
      },
      error: error => console.log(error)
    });
}


  else if(this.modalTitle==='Edit Name'){
    this.auth.updateName(id,  this.update.value.Name)
    .subscribe({
      next: response => {
        reference?.click();
        this.displayUser();


      },
      error: error => console.log(error)
    });
}


    else{
      this.auth.updateCountry(id, this.update.value.Country)
    .subscribe({
      next: response => {
        reference?.click();

        this.displayUser();
      },
      error: error => console.log(error)
    });

    }
  }
  Url="../assets/image/job.jpg"

  onSelectFile(pic: Event,id:number) {
    if (pic.target !== null && pic.target instanceof HTMLInputElement && pic.target.files !== null) {
      const file = pic.target.files[0];
      if (file.type.startsWith('image/')) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.Url = event.target.result;
          this.uploadimage(this.Url,id)
        };
      } else {
        console.log('Selected file is not an image.');
      }
    }
  }

  openFileInput() {
    const fileInput = document.getElementById('fileinput');
    fileInput?.click();
  }

  uploadimage(Url:string,Id:number){
    this.auth.uploadImage(Url,Id)
    .subscribe({
      next: response => {
        this.displayUser();
      },
      error: error => console.log(error)
    });
}


  }


