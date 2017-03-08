/**
 * Created by yzy on 2017/2/23.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "../app.config";

@Injectable()
export class CommonService {

  constructor(
    private http: Http
  ) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public getTeacherProfessionTitle(): Promise<any> {
    return this.http.get(Config.SERVER_BASE_URL + 'code/professionalTitleList')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getTeacherListWithParams(params: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'teacher/simpleList', params)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getStudentListWithParams(params: any): Promise<any> {
    return this.http.post(Config.SERVER_BASE_URL + 'student/simpleList', params)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }
}
