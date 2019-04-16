import { Component, Input } from '@angular/core';
import { locateHostElement } from '@angular/core/src/render3/instructions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-BlogPost',
  templateUrl: './Blog-Post.component.html',
  styleUrls: ['./Blog-Post.component.css']
})
export class BlogPostComponent {
  constructor() {
    this.Currentuser = localStorage.currentuser;
    if (!sessionStorage.comments) this.comm = [];
    else this.comm = JSON.parse(sessionStorage.comments);
    this.Body = sessionStorage.body;
    this.Title = sessionStorage.title;
  }
  public comm: Comment[] = [];
  public Title;
  public Body;
  public Currentuser;
  public Comment;
  public OnClickPost() {
    this.Title = (document.getElementById("textbox3") as HTMLInputElement).value;
    this.Body = (document.getElementById("textbox2") as HTMLInputElement).value;
    sessionStorage.title = this.Title;
    sessionStorage.body = this.Body;
  }
  public OnClickComment() {
    this.Comment = (document.getElementById("textbox4") as HTMLInputElement).value;
    var cm = new Comment();
    cm.Comm = this.Comment;
    cm.User = this.Currentuser;
    this.comm.push(cm);
    sessionStorage.comments = JSON.stringify(this.comm);
    (document.getElementById("textbox4") as HTMLInputElement).value = "";
  }
}
export class Comment {
  public User: string;
  public Comm: string; 
}
