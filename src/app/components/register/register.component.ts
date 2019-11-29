import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private name: string;
  private surname:string;
  private email: string;
  private password: string;

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit() {
  }

  submitForm() {
    this.api.register(this.name, this.surname, this.email, this.password).subscribe((obj) => {
      alert('Registered successfully, logging in');
      this.api.login(this.password, this.email);
      this.api.getToken().subscribe((obj) => {
        if (obj !== '') this.router.navigateByUrl('private');
      });
    }, (err) => alert(err['error']['err']));
  }
}
