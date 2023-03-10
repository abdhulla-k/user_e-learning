import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

type signupData = { name: string, email: string, password: string, confirmPassword: string };
type loginDetails = { email: string, password: string };
type loginResponse = { token: string, message: string, loggedIn: boolean, time: number };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new EventEmitter();
  loggedInStatus = false;
  experationDurationTime = 0;
  baseRoute = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(signupData: signupData) {
    this.http.post<signupData>(
      `${this.baseRoute}/signup`,
      signupData).subscribe(
        data => {
          console.log(data);
        }
      )
  }

  login(loginData: loginDetails) {
    this.http.post<loginResponse>(
      `${this.baseRoute}/login`,
      loginData
    ).subscribe(
      response => {
        console.log(response);
        if (response.loggedIn === true) {
          console.log('logged In')
          this.loggedInStatus = true;
          this.loggedIn.emit(true);
          localStorage.setItem('userData', JSON.stringify(response))
          this.autoLogout(response.time)
          this.router.navigate(["/user"])
        }
      }
    )
  }

  verifyUser(routeData: { id: string, token: string }) {
    console.log(routeData);
    this.http.get(
      `${this.baseRoute}/verify/${routeData.id}/${routeData.token}`
    ).subscribe(response => {
      console.log(response);
    })
  }

  autoLogin() {
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    if (data.jwtToken) {
      this.loggedInStatus = true;
      this.loggedIn.emit(true);
    }
  }

  autoLogout(expirationTime: number) {
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(["/user/login"])
    }, expirationTime)
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(["/user/login"])
  }
}