import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

@Injectable()
export class AuthService {

    constructor(private router: Router){}

    authChange = new Subject<boolean>()
    private user: User | null

    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authChange.next(true)
        this.authSuccessfully()
    }

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authChange.next(true)
        this.authSuccessfully()
    }

    logout() {
        this.user = null
        this.authChange.next(false)
        this.router.navigate(['/login'])
    }

    getUser(){
        return {...this.user}
    }

    isAuth() {
        return this.user != null
    }

    authSuccessfully() {
        this.router.navigate(['/training'])
    }
}