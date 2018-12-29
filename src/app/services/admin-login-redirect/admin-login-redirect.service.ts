import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginRedirectService {

  constructor(private localStorage: LocalStorage,
    private router: Router) { }

  canActivate() {
    this.localStorage.getItem<any>('user').subscribe((user) => {
      if(user){
        this.router.navigate(['admin/home']);
        return false;
      }
    });
    return true;
  }
}
