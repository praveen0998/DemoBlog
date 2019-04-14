import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-BlogPost',
  templateUrl: './Blog-Post.component.html',
  styleUrls: ['./Blog-Post.component.css']
})
export class BlogPostComponent {
  public comm: string[] = [];
  public Title;
  public Body;
  public Comment;
  public OnClickPost() {
    this.Title = (document.getElementById("textbox3") as HTMLInputElement).value;
    this.Body = (document.getElementById("textbox2") as HTMLInputElement).value;
  }
  public OnClickComment() {
    this.Comment = (document.getElementById("textbox4") as HTMLInputElement).value;
    this.comm.push(this.Comment);
    (document.getElementById("textbox4") as HTMLInputElement).value = "";
  }
}
