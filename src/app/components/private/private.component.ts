import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  public token: string;
  public books: any[];

  private query:string;
  private field = 'Title';
  
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
        }, () => {
          // Error
          alert('Invalid token');
          this.router.navigateByUrl('');
        })
      }
    });
  }

  search() {
    let aux = this.field.toLowerCase();
    this.api.getBooks(aux, this.query).subscribe((observer) => {
      console.log(observer['books']);
      this.books = observer['books'];
    }, (err) => {

    });
  }

  setField(field:string) {
    this.field = field;
  }
}