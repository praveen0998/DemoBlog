import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, UserService, Result, UserLocal } from '../../main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  public dataLoading: boolean = false;
  public ausLocal: AuthenticationService = new AuthenticationService ();
  public us: UserService = new UserService();
  public username: string;
  public password: string;

  constructor() {
    this.ausLocal.ClearCredentials();
  }

  public login(username: string, password: string) {
    this.dataLoading = true
    this.username = username;
    this.password = password;
    this.ausLocal.login(username, password, this);
    var ul = new UserLocal();
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

    ul.EncryptedPassword = ciphertext;
    ul.UserName = username;
    var res = this.us.GetByUserName(username);
    if (username !== null && res.EncryptedPassword === ul.EncryptedPassword) {
      localStorage.currentuser = username;
      location.pathname = "/Blog-Post";
    } else {
      alert("Username and Password doesnot exist or not registerd");
    }
  }

  public callback (result: Result) {
    this.ausLocal.setCredentials(this.username, this.password);
    this.dataLoading = false;
  }
}
