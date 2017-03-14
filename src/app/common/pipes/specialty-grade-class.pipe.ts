/**
 * Created by yzy on 2017/3/14.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {isNullOrUndefined} from "util";
@Pipe({
  name: 'specialtyGradeClass'
})
export class SpecialtyGradeClassPipe implements PipeTransform {
  transform(specialtyId: any, grade: number, classes: Array<any>): Array<any> {
    let temp = [];

    if (isNullOrUndefined(specialtyId) || isNullOrUndefined(grade) || isNullOrUndefined(classes))
      return temp;

    for (let classInfo of classes) {
      if (classInfo.year == grade && classInfo.specialty_id == specialtyId)
        temp.push(classInfo);
    }

    return temp;
  }
}
