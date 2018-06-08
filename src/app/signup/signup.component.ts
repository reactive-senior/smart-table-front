import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    email: string = "";
    password: string = "";
    name: string = "";
    password_confirm: string = "";

    constructor(public router: Router, private _authService: AuthService) {}

    ngOnInit() {}

    register(){
        if(this.password != this.password_confirm)
        {
            alert("Password does not match!");
            return;
        }
        if(!this.password || !this.name || !this.password_confirm || !this.email)
        {
            alert("Something is missing!");
            return;
        }
        this._authService.signup({name: this.name, email: this.email, password: this.password}).subscribe(response => {
            console.log(response);
            if(response['response_message'] == 200)
                this.router.navigate(['/login']);
        })
    }
}
