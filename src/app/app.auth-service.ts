/**
 * Created by jwc on 2016/12/30.
 */

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {SessionStorageService} from "ng2-webstorage";

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;
  userId: string;
  userType: string;

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
    private http: Http,
  ){
    this.userId = sessionStorage.retrieve('userId');
    this.userType = sessionStorage.retrieve('userType');
    this.isLoggedIn = !isNullOrUndefined(this.userId);
  }

  private loginHttp(data: any): Promise<any> {
    return this.http.post('http://localhost/' + 'auth/login', data)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(data: any): void {
    this.userType = data.userType;
    this.sessionStorage.store('userType', this.userType);
    this.loginHttp(data).then( result => {
      if (result.code == '200') {
        this.isLoggedIn = true;
        this.userId = result.data.id;
        this.sessionStorage.store('userId', this.userId);
        if (!isNullOrUndefined(this.redirectUrl))
          this.router.navigate([this.redirectUrl]);
        else
          this.router.navigate(['']);
      } else {
        if (window.confirm(result.message + ',是否重试')) {
          this.login(data);
        }
      }
    });
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.sessionStorage.clear("userId");
    this.redirectUrl = null;
    this.router.navigate(['/login']);
  }
}
