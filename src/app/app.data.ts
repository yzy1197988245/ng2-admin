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

  constructor(
    private http: Http
  ) {
    this.getSex();
    this.getSchool();
    this.getSpecialty();
    this.getClassInfo();
  }

  getSex(): void {
    this.http.get(Config.SERVER_BASE_URL + 'code/sex')
      .subscribe((result) => {
        this.sex = result.json();
      })
  }

  getSchool(): void {
    this.http.get(Config.SERVER_BASE_URL + 'code/school')
      .subscribe((result) => {
        this.school = result.json();
      })
  }

  getSpecialty(): void {
    this.http.get(Config.SERVER_BASE_URL + 'code/specialty')
      .subscribe((result) => {
        this.specialty = result.json();
      })
  }

  getClassInfo(): void {
    this.http.get(Config.SERVER_BASE_URL + 'code/classInfo')
      .subscribe((result) => {
        this.classInfo = result.json();
      })
  }
}
