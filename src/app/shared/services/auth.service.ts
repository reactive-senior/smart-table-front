import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpHeader: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    });
  }

  login(data: { email: string, password: string }) {
    let desURL = 'http://localhost:8080/auth/login';
    let login_info = {
      "email": data.email,
      "password": data.password
    }
    return this.http.post(desURL, login_info, { headers: this.httpHeader });
  }

  signup(data: { name: string, email: string, password: string }) {
    let desURL = 'http://localhost:8080/auth/signup';
    let signup_info = {
      "name": data.name,
      "email": data.email,
      "password": data.password
    }
    return this.http.post(desURL, signup_info, { headers: this.httpHeader });
  }
}
