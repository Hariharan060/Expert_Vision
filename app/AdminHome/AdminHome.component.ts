import { UserPost, UserComment, Reply } from '../Shared/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
@Component({
  selector: 'app-AdminHome',
  templateUrl: './AdminHome.component.html',
  styleUrls: ['./AdminHome.component.css']
})
export class AdminHomeComponent implements OnInit {
AddComment:string='';

  Post!:FormGroup;
  coment!:FormGroup

  posts:UserPost=new UserPost();
  com:UserComment=new UserComment();
  reply:Reply=new Reply();

displayUserPost:any;
displayreply:any
displayUserComment:any;

Id:number=0;


 name=sessionStorage.getItem('username');
searchKey:string='';
  displayimage: any;
  UserDetail: any;
  constructor( private fb:FormBuilder,private auth:AuthService) {
   }


  ngOnInit() {
    this.displayPost();
    this.displayImage();
    this.displayUser();
    //post form
this.Post=this.fb.group({
Title:['',Validators.required],
Message:['',Validators.required]
});
//comment form
this.coment=this.fb.group({
comment:['',Validators.required]

})

  }

  displayUser(){
    if(this.name!=null){
      this.auth.getUser()
       .subscribe(response=> {
         this.UserDetail=response;
       });

     }
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



//posting the posts to json

//displaying the posts
    displayPost(){
      this.auth.getPosts()
       .subscribe(response=> {
         this.displayUserPost=response;
       });

     }

    //posts like function



inputValues: { [postId: number]: string } = {};
//post the comment to json
     postComment(Id:number){
      const postId=Id;

      this.com.ParentId=postId;
      this.com.Comment=this.inputValues[postId];
      this.com.Name=this.name;
      this.auth.postComment(this.com)
          .subscribe({
           next:response=>{

            this.coment.reset();
       this.displayComment(postId)
          },
           error:error=> {console.error(error);
           alert("Something went wrong")
           }
          });
        }

//retrive comment from json
postComments: { [postId: number]: UserComment[] } = {};

        displayComment(Id:number){
          const postId=Id
          this.auth.getComment(postId)
          .subscribe({next:(response:UserComment[])=> {
            this.postComments[postId] = response;

            this.displayUserComment=response;
            this.postComments[postId].sort((a: { pinned: any; }, b: { pinned: any; }) => {
              if (a.pinned && !b.pinned) {
                return -1; // a comes before b
              } else if (!a.pinned && b.pinned) {
                return 1; // b comes before a
              } else {
                return 0; // maintain the existing order
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

deletePost(postId:number){
  this.auth.deletePost(postId)
       .subscribe(response=> {
        alert("Post deleted Succesfully")
        this.displayPost();

       });
}
pin(comment:UserComment,post:UserPost){

    if (comment.pinned===false) {
      comment.pinned=true;
      post.pinned++;
alert("comment is pinned");
    } else {
      comment.pinned=false;
      alert("comment is Unpinned");
      post.pinned--;

    }
    this.auth.pincount(post.id,post.pinned)
    .subscribe(response=> {

    });
    this.auth.pin(comment.id, comment.pinned )
      .subscribe({
        next: response => {
        },
        error: error => console.log(error)
      });


}

displayImage(){
  this.auth.getImage()
      .subscribe({
        next: response => {
          this.displayimage=response
          console.log(response)
        },
        error: error => console.log(error)
      });
}

Url="../assets/image/job.jpg"

  onSelectFile(pic: Event,id:number) {
    if (pic.target !== null && pic.target instanceof HTMLInputElement && pic.target.files !== null) {
      const file = pic.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.Url = event.target.result;
          this.uploadimage(this.Url,id)
        };

    }
  }

  openFileInput(id:number) {
    const fileInput = document.getElementById('fileinput'+id);
    fileInput?.click();
  }

  uploadimage(Url:string,Id:number){
    this.auth.updateImage(Url,Id)
    .subscribe({
      next: response => {
        this.displayImage();
      },
      error: error => console.log(error)
    });
}



     adjustTextareaHeight(textareaElement: EventTarget | null) {
      if (textareaElement instanceof HTMLTextAreaElement) {
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    }


}


