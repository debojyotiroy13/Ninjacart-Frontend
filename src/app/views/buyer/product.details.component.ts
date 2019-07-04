import {Component, OnInit} from '@angular/core';
import {RestService} from '../../app.service';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'product-root',
  templateUrl: './product.details.component.html',
  styleUrls: ['./buyer.component.css']
})


export class ProductDetailsComponent implements OnInit{
  title = 'Catalog';

  /* Product Variables */
  productName: string = '';
  productDescription: string = '';
  productPrice: number;
  productCategory: string = '';
  productImage: string = '';

  answerDisplay: string = '';
  showSpinner: boolean = false;

  /* Product Table Params */
  displayedColumns: string[] = [ 'category', 'name', 'description', 'price', 'action'];
  tableLength = 100;
  tablePageSize = 10;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private restService: RestService, private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute){
    // this.getProduct();
    // this.getCategories();
  }

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

  ngOnInit(){
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  getProduct(id){
    this.restService.get('product/' + id).subscribe((data : any) => {
      this.productName = data.name;
      this.productDescription = data.description;
      this.productCategory = data.category;
      let catg : string = data.category;
        
        if(catg.toLowerCase()=="grocery"){
          data.image = this.groceryImages[Math.floor(Math.random() * Math.floor(100))%this.groceryImages.length];
        } else if(catg.toLowerCase()=="laptop"){
          data.image = this.laptopImages[Math.floor(Math.random() * Math.floor(100))%this.laptopImages.length];
        }else if(catg.toLowerCase()=="mobile"){
          data.image = this.phoneImages[Math.floor(Math.random() * Math.floor(100))%this.phoneImages.length];
        }else{
          data.image = this.groceryImages[0];
        }
        this.productImage = data.image;
    }); 
  }

}