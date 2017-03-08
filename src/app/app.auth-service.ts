/**
 * Created by jwc on 2016/12/30.
 */

import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;
  userId: string;
  userType: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: Http,
  ){
    this.userId = cookieService.get('userId');
    this.userType = cookieService.get('userType');
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
    this.cookieService.put('userType', this.userType);
    this.loginHttp(data).then( result => {
      if (result.code == '200') {
        this.isLoggedIn = true;
        this.userId = result.data.id;
        this.cookieService.put('userId', this.userId);
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
    this.cookieService.remove("userId");
    this.redirectUrl = null;
    this.router.navigate(['/login']);
  }
}
