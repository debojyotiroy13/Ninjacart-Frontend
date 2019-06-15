import {Component} from '@angular/core';
import {RestService} from '../../app.service';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'cart-root',
  templateUrl: './cart.component.html',
  styleUrls: ['./buyer.component.css']
})


export class CartComponent {
  title = 'Catalog';
  answer: string = '';
  itemsDataSource = [{color: 'lightblue'},{color: 'lightgreen'},{color: 'lightpink'},{color: '#DDBDF1'}];
  productDataSource: any[] = [];
  categoriesDataSource: any[] = [];

  /* Product Variables */
  productName: string = '';
  productDescription: string = '';
  productPrice: number;
  productCategory: string = '';

  /* Category Variables */
  categoryName: string = '';
  categoryDescription: string = '';
  categoryDataSource: any = [];
  

  answerDisplay: string = '';
  showSpinner: boolean = false;

  /* Product Table Params */
  displayedColumns: string[] = [ 'category', 'name', 'description', 'price', 'action'];
  tableLength = 100;
  tablePageSize = 10;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private restService: RestService, private snackBar: MatSnackBar, 
    private router: Router,private authService: AuthService){
    this.getProduct();
    this.getCategories();
    console.log(this.authService.getUserInfo())
  }

  getProduct(){
    this.restService.get('product').subscribe((data : any) => {
      this.productDataSource = data;
    }); 
  }

  getCategories(){
    this.restService.get('categories').subscribe((data : any) => {
      this.categoriesDataSource = data;
    }); 
  }

  quickview(item){
    this.router.navigate(['product', item.id]);
  }

}