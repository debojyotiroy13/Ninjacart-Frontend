import {Component} from '@angular/core';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Facebook';
  constructor(private authService: AuthService){}
  
  logout(){
    console.log("Logging out!")
    this.authService.removeLoggedInState();
  }
}