/**
 * Created by yzy on 2017/3/3.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Promise} from "es6-promise";
import {Config} from "../../../../app.config";

@Injectable()
export class AdminService {
    constructor(
        private http: Http,
        private configService: Config
    ){}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public projectAutomaticDistribution(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'project/projectAutomaticDistribution', this.configService.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getAdminProjectList(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'project/getAdminProjectList', this.configService.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentListWithoutSelectedProject(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'student/getStudentListWithoutSelectedProject', this.configService.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}
