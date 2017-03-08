import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AuthService} from "../app.auth-service";
import {Config} from "../app.config";
/**
 * Created by yzy on 2016/12/30.
 */

export class MyResult {
    public code?: string;
    public message?: string;
    public data?: any;
}

@Injectable()
export class PagesService {

    constructor(
        private http: Http,
        private configService: Config,
    ) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    public getMenu(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'auth/menu', this.configService.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getTaskList(): Promise<any> {
        return this.http.get(Config.SERVER_BASE_URL + 'task/getTaskList', this.configService.requestOptions)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
}
