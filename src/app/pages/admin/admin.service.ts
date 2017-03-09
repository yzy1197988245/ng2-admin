/**
 * Created by yzy on 2017/1/22.
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {MyResult} from "../pages.service";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "../../app.auth-service";
import {Config} from "../../app.config";

@Injectable()
export class AdminService {

  private requestOptions:RequestOptions;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.requestOptions = new RequestOptions();
    this.requestOptions.headers = new Headers();
    this.requestOptions.headers.set('userId', authService.userId);
    this.requestOptions.headers.set('userType', authService.userType);
  }

  public handleError(error: any) {

  }

  public createMenu(menu: any): Promise<MyResult> {
    return this.http.post(Config.SERVER_BASE_URL + 'menu/create', menu, this.requestOptions)
      .toPromise()
      .then(response => response.json() as MyResult)
      .catch(this.handleError);
  }

  public getMenu(): Promise<any> {
    let data = {
      userId: 0,
      userRole: 0
    };
    return this.http.post(Config.SERVER_BASE_URL + 'auth/menu', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getMenuDetail(id: number): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'menu/detail?id=' + id, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public deleteMenu(id: number): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'menu/delete?id=' + id, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getRoleList(): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'role/list', this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getRoleListWithUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/listWithUser', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public createRole(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/createOrUpdate', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getRoleRoutes(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/routes', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public addPower(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/addPower', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public deletePower(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/deletePower', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getUserList(): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'user/list', this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public createUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'user/create', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public deleteUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'user/delete', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public addRoleToUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/addRoleToUser', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public deleteUserRole(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/deleteUserRole', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getFileList(): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'file/list', this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public uploadFile(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'file/upload', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
