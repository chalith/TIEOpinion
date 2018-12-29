import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { methods } from '../../common/api';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private apiService: ApiService,
    private localStorage: LocalStorage) { }

  login(data){
    return this.apiService.get(methods.admin.login, data);
  }

  logout(){
    return this.localStorage.removeItem('user');
  }
}
