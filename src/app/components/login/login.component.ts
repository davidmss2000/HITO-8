import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private api:ApiService, private router: Router) {}

  ngOnInit() {
  }

  submitForm() {
    this.api.login(this.password, this.email); 
    this.api.getToken().subscribe((obj) => {
      if (obj !== '') this.router.navigateByUrl('private');
    })
  }

}