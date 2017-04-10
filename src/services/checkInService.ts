import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import {  Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CheckInService {

  constructor(private http: Http) {

  }

  checkIn(firstName, lastName, email, company): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        'https://www.indigoapps.co.uk/iR/sign_in/sign_in_app',
        JSON.stringify({ firstName, lastName, email, company }),
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        return res;
      })
      .catch(this.handleError)

  }

  getCheckins(): Observable<any> {
    let search = false
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        'https://www.indigoapps.co.uk/iR/sign_in/get_current_sign_ins_app',
        { search },
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        return res;
      })
      .catch(this.handleError)


  }

  signOut(user): Observable<any> {
    console.log(user)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        'https://www.indigoapps.co.uk/iR/sign_in/sign_out_app',
        JSON.stringify({ 'userid': user.id , 'email': user.email, 'first_name': user.first_name }),
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        return res;
      })
      .catch(this.handleError)


  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 0){
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        let consoleErr = `${error.status} - ${error.statusText || ''} ${err}`;
        console.log(consoleErr);
        errMsg = "There may be a problem with the internet or database connection."
      }else{
        errMsg = (error as any)._body;
      }
    } else {
      errMsg = error._body ? error._body : error.toString();
    }
    //errMsg = error._body.toString();
    return Observable.throw(errMsg);
  }

}
