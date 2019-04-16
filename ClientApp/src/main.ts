import { enableProdMode, Inject, Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { last } from '@angular/router/src/utils/collection';
import { Location } from '@angular/common';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));

@Injectable ()
export class UserService {
  public baseUrl: string;
  public http;
  public users: UserLocal[] = [];

  constructor() {
    this.loaddata();
  }

  public GetAll() {
    try {
      this.http.get(this.baseUrl + 'api/SampleData/users').subscribe(result => {
        console.log(result);
      }, error => console.error(error));
    } catch (e) {
      console.log(e);
    }
  }

  public GetById(id) {
    try {
      this.http.get(this.baseUrl + 'api/SampleData/users/Id=' + id).subscribe(result => {
        console.log(result);
      }, error => console.error(error));
    } catch (e) {
      console.log(e);
    }
  }

  public GetByUserName(userName: string) {
    var filtered = this.users.filter(x => x.UserName.toUpperCase() == userName.toUpperCase ());
    var result = filtered.length > 0 ? filtered[0] : null;
    return result;
  }

  public Create(user: UserLocal) {

    var res = this.GetByUserName(user.UserName);
    if (res != null) {
      alert("Username already exist");
    }
    else {
      
      var id = 1;
      if (this.users.length!=0) {
        var lastUser = this.users[this.users.length - 1];
        user.Id = lastUser.Id + 1;
      }
      else {
        user.Id = 1;
      }
      this.users.push(user);
      this.savedata(this.users);
      location.pathname = "/login";
    }

  }

  public Update(user: UserLocal) {
  }

  public Delete(id) {
  }
  public savedata(users) {
     localStorage.users = JSON.stringify(users);
      
  }
  public loaddata() {
    if (!localStorage.users) {
      localStorage.users = JSON.stringify([]);
    }
      return this.users = JSON.parse(localStorage.users);
  }

}

export class UserLocal {
  public UserName: string;
  public EncryptedPassword: string;
  public Id: number;
}

  export class AuthenticationService {
    public login(username: string, password: string, response) {
      var res = new Result();
      res.success = true;
      res.message = "Login successful";
      response.callback(res);
    }

    public setCredentials(username, password) {
    }

    public ClearCredentials() {
    }
}

export class Result {
  public success: boolean;
  public message: string;
}
