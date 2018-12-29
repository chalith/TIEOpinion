import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { AdminLoginService } from '../services/admin-login/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  navbarItems;
  user;
  dataLoaded = false;

  constructor(private localStorage: LocalStorage,
    private adminLoginService: AdminLoginService,
    private router: Router) { }

  ngOnInit() {
    this.localStorage.getItem<any>('user').subscribe((user) => {
      if(user){
        this.user = user.user;
        this.dataLoaded = true;
      }
    });
    this.navbarItems = [
      { name: "Home", route: "dashboard" }
    ]
  }

  logout(){
    this.adminLoginService.logout().subscribe(()=>{
      this.router.navigate(['admin']);
    })
  }

}
