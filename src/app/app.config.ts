/**
 * Created by yzy on 2017/3/8.
 */

import {Injectable} from "@angular/core";
import {RequestOptions, Headers} from "@angular/http";
import {AuthService} from "./app.auth-service";
import {GlobalState} from "./global.state";

@Injectable()
export class Config {
  public static SERVER_BASE_URL = 'http://localhost/';

  private _requestOptions: RequestOptions;

  get requestOptions(): RequestOptions {
    this._requestOptions = new RequestOptions();
    this._requestOptions.headers = new Headers();
    this._requestOptions.headers.set('userId', this.authService.userId);
    this._requestOptions.headers.set('userType', this.authService.userType);
    return this._requestOptions;
  }

  constructor(
    private authService: AuthService,
    private state: GlobalState
  ) {
  }

  public clear(): void {
    this._requestOptions = null;
  }

  public init(): void {
    this._requestOptions = new RequestOptions();
    this._requestOptions.headers = new Headers();
    this._requestOptions.headers.set('userId', this.authService.userId);
    this._requestOptions.headers.set('userType', this.authService.userType);
    console.log(this._requestOptions);
  }
}
