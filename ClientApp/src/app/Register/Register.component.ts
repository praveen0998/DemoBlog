import { Component } from '@angular/core';
import { UserService, UserLocal } from '../../main';
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html'
})
export class RegisterComponent{
  public UService: UserService = new UserService();
  public username: string;
  public password: string;
  public register(username: string, password: string) {
    var reg = new UserLocal();
    //Encrypting the password in register
    var i = 0;
    var plainCharacter;
    var ciphertext = "";
    for (i = 0; i < password.length; i++) {
      plainCharacter = password.charCodeAt(i);
      if (plainCharacter >= 97 && plainCharacter <= 122) {
        ciphertext += String.fromCharCode((plainCharacter - 97 + 4) % 26 + 97);
      } else if (plainCharacter >= 65 && plainCharacter <= 90) {
        ciphertext += String.fromCharCode((plainCharacter - 65 + 4) % 26 + 65);
      } else {
        ciphertext += String.fromCharCode(plainCharacter);
      }
     }
    reg.EncryptedPassword = ciphertext;    
    reg.UserName = username;
    this.UService.Create(reg);
    
  }

  }
