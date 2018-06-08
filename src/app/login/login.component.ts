import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    email: string = "";
    password: string = "";

    constructor(public router: Router, private _authService: AuthService) {}

    ngOnInit() {}

    onLoggedin() {
        this._authService.login({email: this.email, password: this.password}).subscribe(resopnse => {
            if(resopnse['response_message'] == 200){
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            } else {
                alert("Email or password is wrong");
            }
        })
    }
}
