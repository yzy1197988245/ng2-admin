/**
 * Created by yzy on 2017/1/22.
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "../../app.auth-service";
import {Config} from "../../app.config";

@Injectable()
export class AdminService {

  private requestOptions:RequestOptions;

  constructor(
    private http: Http,
    private authService: AuthService,
    private config: Config
  ) {
    this.requestOptions = new RequestOptions();
    this.requestOptions.headers = new Headers();
    this.requestOptions.headers.set('userId', authService.userId);
    this.requestOptions.headers.set('userType', authService.userType);
  }

  public handleError(error: any) {

  }

  /**
   * Menu
   */
  public createMenu(menu: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'menu/create', menu, this.requestOptions)
      .toPromise()
      .then(response => response.json())
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

  /**
   * Role
   */
  public getRoleList(): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'role/list', this.requestOptions)
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

  /**
   * Power
   */
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

  /**
   * User
   */
  public adminGetUserListWithParams(params: any = {}): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'user/admin/adminGetUserListWithParams', this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminCreateUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'user/admin/adminCreateUser', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminDeleteUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'user/admin/adminDeleteUser', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminAddRoleToUser(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/admin/adminAddRoleToUser', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminDeleteUserRole(data: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'role/admin/adminDeleteUserRole', data, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * File
   */
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

  public adminGetFileList(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'file/adminGetFileList', params, this.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Student
   */
  public adminGetStudentListWithParams(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'student/admin/adminGetStudentListWithParams', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminImportStudentFromFile(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'student/admin/adminImportStudentFromFile', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminCreateStudent(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'student/admin/adminCreateStudent', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminUpdateStudent(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'student/admin/adminUpdateStudent', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Teacher
   */
  public adminGetTeacherListWithParams(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'teacher/admin/adminGetTeacherListWithParams', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminImportTeacherFromFile(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'teacher/admin/adminImportTeacherFromFile', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminCreateTeacher(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'teacher/admin/adminCreateTeacher', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public adminUpdateTeacher(params: any = {}): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'teacher/admin/adminUpdateTeacher', params, this.config.requestOptions)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
