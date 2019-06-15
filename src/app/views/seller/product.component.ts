import {Component} from '@angular/core';
import {RestService} from '../../app.service';
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

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'product-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent {
  title = 'Facebook';
  answer: string = '';

  /* API Variables */
  productDataSource: any = [];
  categoryDataSource: any = [];
  itemDataSource: any = [];
  /* Selection Variables */
  selectedCategory: any;
  selectedProduct: any;
  selectedQuantity: number;
  selectedPrice:number;
  
  /* Random Variables */
  answerDisplay: string = '';
  showSpinner: boolean = false;

  /* Item Table Params */
  displayedColumns: string[] = [ 'category', 'product', 'quantity', 'price', 'action'];
 
  tableLength = 100;
  tablePageSize = 10;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private restService: RestService, private snackBar: MatSnackBar){
    this.getProduct();
    this.getCategory();
    this.getItem();
  }

  applyFilter(filterValue: string) {
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  selectProduct(filterValue: string) {
  }

  

  getCategory() {
    this.restService.get('categories').subscribe((data : any) => {
      //this.categoryDataSource = new MatTableDataSource(data);
      this.categoryDataSource = data;
    }); 
  }


  getItem(){
    this.restService.get('items').subscribe((data : any) => {
      this.itemDataSource = new MatTableDataSource(data);
      this.itemDataSource = data;
    }); 
  }


  getProduct(){
    this.restService.get('product').subscribe((data : any) => {
      this.productDataSource = new MatTableDataSource(data);
      this.productDataSource = data;
    }); 
  }

  createItem(){
    let prod = {};
    prod['product_id'] = this.selectedProduct['id'];
    prod['category_id'] = this.selectedCategory['id'];
    prod['price'] = Number(this.selectedPrice);
    prod['quantity'] = Number(this.selectedQuantity);
    prod['user_id'] = 1;
    
    this.restService.post('items',prod).subscribe((res: any) => {
      if(res.status==='success'){
        this.getItem();
        this.selectedProduct = null;
        this.selectedCategory = null;
        this.selectedPrice = null;
        this.selectedQuantity = null;
      }else{
        //this.productService.setToastMessage('Error Saving Product! : ' + res.message);
        this.snackBar.open(res.message, 'ERROR', {
          duration: 2000,
        });
      }
    });
  }
  
  deleteItem(id : String){
    this.restService.delete('item', id).subscribe((res: any) => {
      this.getProduct();
    });
  }

  showAnswer() {
    
  }

}