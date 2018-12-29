import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private localStorage: LocalStorage,
    private router: Router) { }

  canActivate() {
    this.localStorage.getItem<any>('user').subscribe((user) => {
      if(!user){
        this.router.navigate(['admin']);
        return false;
      }
    });
    return true;
  }
}
