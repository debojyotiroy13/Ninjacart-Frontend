import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    //private loggedInState: boolean = false;

    public setLoggedInState(state: any){
        localStorage.setItem('token',state);
    }

    public removeLoggedInState(){
        localStorage.removeItem('token');
    }
    
    public getLoggedInState() {
        return !!localStorage.getItem('token');
    }

    public getUserInfo() {
        return localStorage.getItem('token');
    }
}