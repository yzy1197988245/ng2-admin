/**
 * Created by yzy on 2017/3/14.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "./app.config";
@Injectable()
export class DataService {

  sex: Array<any>;
  school: Array<any>;
  specialty: Array<any>;
  classInfo: Array<any>;
  professionalTitle: Array<any>;
  role: Array<any>;
  projectSource: Array<any>;
  projectProperty: Array<any>;

  constructor(
    private http: Http
  ) {
    this.getCode();
  }

  getCode(): void {
    this.http.get(Config.SERVER_BASE_URL + 'code/getCode')
      .subscribe(result => {
        result = result.json();
        this.sex = result['sex'];
        this.school = result['school'];
        this.specialty = result['specialty'];
        this.classInfo = result['classInfo'];
        this.professionalTitle = result['professionalTitle'];
        this.role = result['role'];
        this.projectSource = result['projectSource'];
        this.projectProperty = result['projectProperty'];
      })
  }
}
