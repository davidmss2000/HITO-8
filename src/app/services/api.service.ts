import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token = new BehaviorSubject('');

  private baseURL = 'http://localhost:80/';
  private loginURL = 'user/login';
  private registerURL = 'user/register';
  private protectedURL = 'user/private';
  private bookURL = 'book/all'

  constructor(private http: HttpClient) {}

  setToken (token:string) {
    this.token.next(token);
  }

  getToken(): any {
    return this.token;
  }

  clearToken () {
    this.token.next('');
  }

  verifyToken(token:string): Observable<any>{
    return this.http.get(this.baseURL + this.protectedURL, { headers: { 'Authorization' : token } });
  }

  login(password:string, email:string) {
    // API call and set token when ready
    this.http.post(this.baseURL + this.loginURL, {"email":email, "password":password}).subscribe((obj) => {
      alert('Login correcto');
      this.setToken(obj['token']);
    }, (err) => {
      alert(err['error']['err']);
    });
  }

  getBooks(): Observable<any> {
    return this.http.get(this.baseURL + this.bookURL);
  }

  register(name, surname, email, password): Observable<any>{
    return this.http.post(this.baseURL + this.registerURL, {name, surname, email, password});
  }

}