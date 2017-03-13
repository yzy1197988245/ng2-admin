/**
 * Created by jwc on 2016/12/30.
 */

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {SessionStorageService} from "ng2-webstorage";
import {GlobalState} from "./global.state";

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
    private globalState: GlobalState
  ) {
    this.init();
  }

  private init(): void {
    this.userId = this.sessionStorage.retrieve('userId');
    this.userType = this.sessionStorage.retrieve('userType');
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
    this.sessionStorage.store('userType', data.userType);
    this.loginHttp(data).then( result => {
      if (result.code == '200') {
        this.isLoggedIn = true;
        this.sessionStorage.store('userId', result.data.id);
        this.init();
        this.globalState.notifyDataChanged('login', null);
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
    this.sessionStorage.clear('userId');
    this.sessionStorage.clear('userType');
    this.init();
    this.globalState.notifyDataChanged('logout', null);
    this.router.navigate(['/login']);
  }
}
