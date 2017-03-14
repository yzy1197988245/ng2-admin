/**
 * Created by yzy on 2017/3/14.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {isNullOrUndefined} from "util";
@Pipe({
  name: 'schoolSpecialty'
})
export class SchoolSpecialtyPipe implements PipeTransform {
  transform(schoolId: any, specialties: Array<any>): Array<any> {
    let temp = [];

    if (isNullOrUndefined(specialties) || isNullOrUndefined(schoolId))
      return temp;

    for (let specialty of specialties) {
      if (specialty.school_id == schoolId) {
        temp.push(specialty);
      }
    }

    return temp;
  }
}
