import { Injectable } from '@angular/core';
import { url } from '../../common/api'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  get(method, params){
    return this.http.get(url+method, { params: params });
  }

  post(method, params, data){
    let options = {};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    options = { headers: headers, params: params };
    return this.http.post(url+method, data, options);
  }

  put(method, params, data){
    let options = {};
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    options = { headers: headers, params: params };
    return this.http.put(url+method, data, options );
  }

  delete(method, params){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = { headers: headers, params: params };
    return this.http.delete(url+method, options );
  }
}
