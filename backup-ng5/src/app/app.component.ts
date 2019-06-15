import {Component} from '@angular/core';
import {ProductService} from './app.service';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';

export interface PeriodicElement {
  id: number,
  name: string;
  description: String;
  price: number;
  category: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Macbook', description: 'Macbook Pro 13" 2019 Model', price: 100000, category: 'Laptop'},
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Facebook';
  answer: string = '';

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
  productDataSource = new MatTableDataSource(ELEMENT_DATA);
  tableLength = 100;
  tablePageSize = 10;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private productService: ProductService, private snackBar: MatSnackBar){
    this.getProduct();
    this.getCategory();
  }

  applyFilter(filterValue: string) {
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  changeCategory() {

  }

  getCategory() {
    this.productService.get('categories').subscribe((data : any) => {
      this.categoryDataSource = data;
    }); 
  }

  createCategory() {
    let catg = {};
    catg['name'] = this.categoryName;
    catg['description'] = this.categoryDescription;
    this.productService.post('categories',catg).subscribe((res: any) => {
      if(res.status==='success'){
        this.getCategory();
      }else{
        //this.productService.setToastMessage('Error Saving Product! : ' + res.message);
        this.snackBar.open(res.message, 'ERROR', {
          duration: 2000,
        });
      }
    });
  }

  getProduct(){
    this.productService.get('product').subscribe((data : any) => {
      this.productDataSource = new MatTableDataSource(data);
    }); 
  }

  createProduct(){
    let prod = {};
    prod['name'] = this.productName;
    prod['category'] = this.productCategory;
    prod['description'] = this.productDescription;
    prod['price'] = Number(this.productPrice);
    this.productService.post('product',prod).subscribe((res: any) => {
      if(res.status==='success'){
        this.getProduct();
      }else{
        //this.productService.setToastMessage('Error Saving Product! : ' + res.message);
        this.snackBar.open(res.message, 'ERROR', {
          duration: 2000,
        });
      }
    });
  }
  editProduct(id : String){
    this.getProduct();
  }
  
  deleteProduct(id : String){
    this.productService.delete('product', id).subscribe((res: any) => {
      this.getProduct();
    });
    // this.showSpinner = true;
    // setTimeout(() => {
    //   this.answerDisplay = this.answer;
    //   this.showSpinner = false;
    // }, 2000);
  }
  showAnswer() {
    
  }

}