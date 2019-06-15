import {Component} from '@angular/core';
import {RestService} from '../../app.service';
import {Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-root',
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})

export class SignupComponent {
  title = 'Facebook';
  
  public email:string;
  public password:string;
  public fname:string;
  public lname:string;

  constructor(private router: Router, private snackBar: MatSnackBar, private restService: RestService, private authService: AuthService){}

  signup(){
    let user = {};
    user['email'] = this.email;
    user['password'] = this.password;
    user['fname'] = this.fname;
    user['lname'] = this.lname;
    user['image_file'] = "default.jpg";
    this.restService.post('register', user).subscribe((data : any) => {
      if(data.status === "success"){
        this.authService.setLoggedInState(true);
        this.router.navigate(['login']);
      }else{
        this.snackBar.open('Unable to register user!', 'ERROR', {
          duration: 2000,
        });
      }
    }, error => {
      this.snackBar.open('Unable to register user!', 'ERROR', {
        duration: 2000,
      });
    });
    
  }
}