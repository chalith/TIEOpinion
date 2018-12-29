import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminLoginService } from '../services/admin-login/admin-login.service';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  messageForm: FormGroup;
  hasError = false;
  sending = false;
  logo;
  mo

  constructor(private fb: FormBuilder,
    private loginService: AdminLoginService,
    private router: Router,
    private localStorage: LocalStorage) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^ ^\t]+@[^ ^\t.]+\.[^ ^\t.]+$/)]],
      password: ['', [Validators.required] ]
    });
  }

  ngOnInit() {
  }

  onSubmit(messageForm: FormGroup){
    this.sending = true;
    var email = messageForm.controls.email.value;
    var password = messageForm.controls.password.value;
    this.loginService.login({
      email: email,
      password: password
    }).subscribe(
      data=>{
        const expiresAt = moment().add(data['expiresIn'],'second');
        this.localStorage.setItem('user', {
          'usertoken': data['idToken'],
          'expires_at': expiresAt.valueOf(),
          'user': data['user']
        }).subscribe(() => {});
        this.sending = false;
        this.router.navigate(['admin/home']);
      },
      error=>{
        console.log(error);
        this.sending = false;
        this.hasError = true;
      }
    );
  }

}
