import {Component} from '@angular/core';
import {RestService} from '../../app.service';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface PeriodicElement {
  id: number,
  name: string;
  description: String;
  price: number;
  category: string;
}

@Component({
  selector: 'product-root',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})


export class ListComponent {
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
  
  showSpinner: boolean = false;

  // Grocery
  groceryImages : string[] = [
    // 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1508928807352-24a4adbb6795?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1498579397066-22750a3cb424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1463490093487-b0ffe9b8e140?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  'https://images.unsplash.com/photo-1540289917366-db90f08d2397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2863&q=80',]


  //Phone
  phoneImages : string[] = [
    'https://images.unsplash.com/photo-1541345023926-55d6e0853f4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1558143396-75d2c4559aad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1558562805-4bf1e2a724eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80']

  //Laptop
  laptopImages : string[] = [
    // 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1704&q=80',
    'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',]


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
  }

  getProduct(){
    this.showSpinner = true;
    this.restService.get('product').subscribe((data : any) => {
      this.productDataSource = data;
      
      this.productDataSource.forEach( (item, index) => {
        let catg : string = item.category;
        
        if(catg.toLowerCase()=="grocery"){
          item.image = this.groceryImages[index%this.groceryImages.length];
        } else if(catg.toLowerCase()=="laptop"){
          item.image = this.laptopImages[index%this.laptopImages.length];
        }else if(catg.toLowerCase()=="mobile"){
          item.image = this.phoneImages[index%this.phoneImages.length];
        }else{
          item.image = this.groceryImages[0];
        }
      })
      this.showSpinner = false;
      console.log(this.productDataSource);
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