/**
 * Created by yzy on 2017/1/31.
 */


import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Promise} from "es6-promise";
import {AuthService} from "../../app.auth-service";
import {Config} from "../../app.config";

@Injectable()
export class KyxtService {

    private requestOptions:RequestOptions;

    constructor(
        private http: Http,
        private authService: AuthService,
        private configService: Config
    ) {
        this.requestOptions = new RequestOptions();
        this.requestOptions.headers = new Headers();
        this.requestOptions.headers.set('userId', authService.userId);
        this.requestOptions.headers.set('userType', authService.userType);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public createOrUpdateProject(data: any): Promise<any> {
        data.creatorId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/createOrUpdate', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getProjectList(data: any = {}): Promise<any> {
        return this.http.post(Config.SERVER_BASE_URL + 'project/list', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public studentSelectProject(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/studentSelectProject', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public updateStudentDescription(data: any): Promise<any> {
        data.userId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'student/updateDescription', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public studentCreateProject(data: any): Promise<any> {
        data.creatorId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/studentCreate', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentWithOrder(): Promise<any> {
        return this.http.post(Config.SERVER_BASE_URL + 'student/listWithOrder', {teacherId: this.authService.userId}, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentDetail(params: any): Promise<any> {
        return this.http.post(Config.SERVER_BASE_URL + 'student/detail', params, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getInterestList(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'code/interest', this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public updateStudentOrder(order: any): Promise<any> {
        let params = {
            teacherId: this.authService.userId,
            order: order
        };
        return this.http.post(Config.SERVER_BASE_URL + 'student/updateOrder', params, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentProjectList(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/studentProjectList', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentSelectedProjects(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/studentSelectedProjects', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public studentDeselectProject(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/studentDeselectProject', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentBaseInfo(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'student/getStudentBaseInfo', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getStudentCreateProjectBaseInfo(data: any = {}): Promise<any> {
        data.studentId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/getStudentCreateProjectBaseInfo', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getProjectDetail(data: any = {}): Promise<any> {
        return this.http.post(Config.SERVER_BASE_URL + 'project/getProjectDetail', data, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getTeacherProjectList(params: any = {}): Promise<any> {
        params.teacherId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/getTeacherProjectList', params, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getTeacherProjectDetail(params: any = {}): Promise<any> {
        params.teacherId = this.authService.userId;
        return this.http.post(Config.SERVER_BASE_URL + 'project/getTeacherProjectDetail', params, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public deleteProject(params: any = {}): Promise<any> {
        return this.http.post(Config.SERVER_BASE_URL + 'project/deleteProject', params, this.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}
