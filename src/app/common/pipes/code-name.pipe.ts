/**
 * Created by yzy on 2017/2/25.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {isNullOrUndefined} from "util";
@Pipe({
  name: 'codeName'
})
export class CodeNamePipe implements PipeTransform {
  transform(value: number, datas: Array<any>): string {
    if (isNullOrUndefined(datas))
      return "unknown";
    for (let data of datas) {
      if (data.id == value)
        return data.name
    }
    return "unknown";
  }
}

