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

  ngOnInit(){
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  getProduct(id){
    this.restService.get('product/' + id).subscribe((data : any) => {
      this.productName = data.name;
      this.productDescription = data.description;
      this.productCategory = data.category;
      
    }); 
  }

}