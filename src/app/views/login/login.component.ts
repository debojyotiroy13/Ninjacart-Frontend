import {Component} from '@angular/core';
import {RestService} from '../../app.service';
import {Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

declare const gapi: any;

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'Facebook';
  
  public email:string;
  public password:string;

  constructor(private router: Router, private snackBar: MatSnackBar, 
    private restService: RestService, private authService: AuthService){}

    ngAfterViewInit() {
      gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'light',
          'onsuccess': param => this.onSignIn(param)
      });
  }

  login(){
    let user = {};
    user['email'] = this.email;
    user['password'] = this.password;
    this.restService.post('login', user).subscribe((data : any) => {
      if(data.status === "success"){
        let obj = {'id' : '', 'name' : `${data.data.fname} ${data.data.lname}`, 'image_url': 'default.jpg', 'email': this.email};
        console.log(obj)
        this.authService.setLoggedInState(obj);
        this.router.navigate(['home']);
      }else{
        this.snackBar.open('Unable to login!', 'ERROR', {
          duration: 2000,
        });
      }
    }, error => {
      this.snackBar.open('Unable to login!', 'ERROR', {
        duration: 2000,
      });
    });

    
  }

  signup(){
    console.log(this.email,this.password);
    this.router.navigate(['register']);
  }


  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    let obj = {'id' : profile.getId(), 'name' : profile.getName(), 'image_url': profile.getImageUrl(), 'email': profile.getEmail()};
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    this.authService.setLoggedInState(obj);
    this.router.navigate(['home']);
  }
}