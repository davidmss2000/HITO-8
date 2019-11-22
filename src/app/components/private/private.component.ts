import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  public token: string;
  public books: any[];
  
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.getToken().subscribe((token) => {
      this.token = token;
      if (this.token == '') {
        alert('Authenticate first');
        this.router.navigateByUrl('');
      } else {
        // Check validity
        this.api.verifyToken(this.token).subscribe((obj) => {
          this.api.getBooks().subscribe((observer) => {
            this.books = observer;
          });
        }, () => {
          // Error
          alert('Invalid token');
          this.router.navigateByUrl('');
        })
      }
    });
  }
}
