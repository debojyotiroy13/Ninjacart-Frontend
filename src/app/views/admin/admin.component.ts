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
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {
  title = 'Facebook';
  answer: string = '';

  /* Product Variables */
  productName: string = '';
  productDescription: string = '';
  productPrice: number;
  productCategory: any ;

  /* Category Variables */
  categoryName: string = '';
  categoryDescription: string = '';
  categoryDataSource: any = [];
  

  answerDisplay: string = '';
  showSpinner: boolean = false;

  /* Product Table Params */
  displayedCategoriesColumns: string[] = ['name', 'description', 'action'];
  displayedProdcutsColumns: string[] = [ 'category', 'name', 'description', 'action'];
  productDataSource = new MatTableDataSource([]);
  tableLength = 100;
  tablePageSize = 10;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private restService: RestService, private snackBar: MatSnackBar){
    this.getProduct();
    this.getCategory();
  }

  applyFilter(filterValue: string) {
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  changeCategory() {

  }

  getCategory() {
    this.restService.get('categories').subscribe((data : any) => {
      this.categoryDataSource = data;
    }); 
  }

  createCategory() {
    let catg = {};
    catg['name'] = this.categoryName;
    catg['description'] = this.categoryDescription;
    this.restService.post('categories',catg).subscribe((res: any) => {
      if(res.status==='success'){
        this.getCategory();
      }else{
        this.snackBar.open(res.message, 'ERROR', {
          duration: 2000,
        });
      }
    });
  }

  getProduct(){
    this.restService.get('product').subscribe((data : any) => {
      this.productDataSource = new MatTableDataSource(data);
    }); 
  }

  createProduct(){
    let prod = {};
    prod['name'] = this.productName;
    prod['category_id'] = this.productCategory.id;
    prod['description'] = this.productDescription;
    this.restService.post('product',prod).subscribe((res: any) => {
      if(res.status==='success'){
        this.getProduct();
        this.productName = "";
        this.productCategory = "";
        this.productDescription = "";
        this.productPrice = null;
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
    this.restService.delete('product', id).subscribe((res: any) => {
      this.getProduct();
    });
  }

  deleteCategory(id : String){
    this.restService.delete('categories', id).subscribe((res: any) => {
      this.getCategory();
    });
  }

  showAnswer() {
    
  }

}