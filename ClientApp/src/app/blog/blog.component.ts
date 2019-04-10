import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  public comment: string[] = [];
  public OnClickComment(inputstring: string, textbox) {
    this.comment.push(inputstring);
    textbox.value = "";
   }
}
