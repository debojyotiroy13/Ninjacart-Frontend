import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class RestService {
    private baseUrl = 'https://debojyotiroy13.pythonanywhere.com/';
   //  private baseUrl = 'http://localhost:5000/';

    constructor(private http: HttpClient) {} //this initialized the HttpClient which we use to do a post or get call

   post(path:String, body:any){
      return this.http.post(this.baseUrl  + path, body,
         {headers: new HttpHeaders().set('Content-Type', 'application/json')});
   }
   get(path:String){
      return this.http.get(this.baseUrl  + path,
         {headers: new HttpHeaders().set('Content-Type', 'application/json')});
   }
   delete(path:String, id : String){
      return this.http.delete(this.baseUrl  + path + '/' + id,
         {headers: new HttpHeaders().set('Content-Type', 'application/json')});
   }
}