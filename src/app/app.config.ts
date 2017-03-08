/**
 * Created by yzy on 2017/3/8.
 */

import {Injectable} from "@angular/core";
import {RequestOptions, Headers} from "@angular/http";
import {AuthService} from "./app.auth-service";

@Injectable()
export class Config {
  public static SERVER_BASE_URL = 'http://localhost/';

  public requestOptions: RequestOptions;

  constructor(
    private authService: AuthService
  ) {
    this.requestOptions = new RequestOptions();
    this.requestOptions.headers = new Headers();
    this.requestOptions.headers.set('userId', authService.userId);
    this.requestOptions.headers.set('userType', authService.userType);
  }
}
