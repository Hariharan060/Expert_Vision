import { UserPost, UserComment, Reply } from '../Shared/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../Shared/auth.service';
@Component({
  selector: 'app-LoginHome',
  templateUrl: './LoginHome.component.html',
  styleUrls: ['./LoginHome.component.css']
})
export class LoginHomeComponent implements OnInit {

AddComment:string='';

  Post!:FormGroup;
  coment!:FormGroup
  posts:UserPost=new UserPost();
  com:UserComment=new UserComment();
  reply:Reply=new Reply();
displayUserPost:any;
displayreply:any
displayUserComment:any;
inputText:string='';
Id:number=0;


 name=sessionStorage.getItem('username');
searchKey:string='';
  displayimage: any;
  UserDetail: any;
  constructor( private fb:FormBuilder,private auth:AuthService) {
   }


  ngOnInit() {
    //post form
this.Post=this.fb.group({
Title:['',Validators.required],
Message:['',Validators.required]
});
//comment form
this.coment=this.fb.group({
comment:['',Validators.required]

})
this.displayPost();
this.displayImage();
this.displayUser();
  }

  displayUser(){
    if(this.name!=null){
      this.auth.getUser()
       .subscribe(response=> {
         this.UserDetail=response;
       });

     }
  }

//posting the posts to json
  post(){
    let reference=document.getElementById('cancel');
    this.posts.Title=this.Post.value.Title;
    this.posts.Message=this.Post.value.Message;
    if(this.name!=null){
    this.posts.Name=this.name;
    }
    this.posts.likes=0;
    this.posts.likedby=[]
    this.auth.postbyUser(this.posts)
        .subscribe({
         next:response=>{

          reference?.click();
          this.Post.reset();
          this.displayPost();

        },
         error:error=>alert("Something went wrong")
        });
    }
//displaying the posts
    displayPost(){
      this.auth.getPosts()
       .subscribe(response=> {
         this.displayUserPost=response;
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
    //posts like function
    likePost(displayUserPost: UserPost) {
      if (this.name != null) {
        if (!displayUserPost.likedby.includes(this.name)) {
          displayUserPost.likes++;
          displayUserPost.likedby.push(this.name);
        } else {
          displayUserPost.likes--;
          displayUserPost.likedby = displayUserPost.likedby.filter(name => name !== this.name);
        }

        this.auth.postlike(displayUserPost.id, displayUserPost.likes, displayUserPost.likedby)
          .subscribe({
            next: response => {
              this.displayPost();
            },
            error: error => console.log(error)
          });
      }
    }

    //commment like function
likecomment(Usercomment:UserComment){
  if (this.name != null) {
    if (!Usercomment.likedby.includes(this.name)) {
      Usercomment.likes++; // Increment likes count locally
      Usercomment.likedby.push(this.name); // Add the user's name to the likedby array
    } else {
      Usercomment.likes--; // Decrement likes count locally
      Usercomment.likedby = Usercomment.likedby.filter(name => name !== this.name); // Remove the user's name from the likedby array
    }

    this.auth.commentLike(Usercomment.id, Usercomment.likes, Usercomment.likedby)
      .subscribe({
        next: response => {
        },
        error: error => console.log(error)
      });
  }

}
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
          .subscribe({next:(response: UserComment[])=> {
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
     adjustTextareaHeight(textareaElement: EventTarget | null) {
      if (textareaElement instanceof HTMLTextAreaElement) {
        textareaElement.style.height = 'auto';
        textareaElement.style.height = textareaElement.scrollHeight + 'px';
      }
    }


}

