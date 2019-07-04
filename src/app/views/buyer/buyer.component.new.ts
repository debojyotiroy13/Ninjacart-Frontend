import {Component, AfterViewInit, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {RestService} from '../../app.service';
import {Observable, throwError } from 'rxjs';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material';
import {MatTableDataSource, PageEvent} from '@angular/material';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import {Router } from '@angular/router';
import {AuthService } from 'src/app/services/auth.service';
import {CrystalLightbox } from 'ngx-crystal-gallery';

@Component({
  selector: 'product-root',
  templateUrl: './buyer.component.new.html',
  styleUrls: ['./buyer.component.new.scss']
})



export class NewListComponent implements AfterViewInit{
  @ViewChild('masonry') masonry: ElementRef;
  title = 'Catalog';
  answer: string = '';
  itemsDataSource = [{color: 'lightblue'},{color: 'lightgreen'},{color: 'lightpink'},{color: '#DDBDF1'}];
  productDataSource: any[] = [];
  categoriesDataSource: any[] = [];
  searchTerm: string= '';

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
  Images : string[] = [
    'assets/europe/1.jpg',
    'assets/europe/2.jpg',
    'assets/europe/3.jpg',
    'assets/europe/4.jpg',
    'assets/europe/5.jpg',
    'assets/europe/7.jpg',
    'assets/europe/8.jpg',
    'assets/europe/9.jpg',
    'assets/europe/10.jpg',
    'assets/europe/11.jpg',
    'assets/europe/12.jpg',
    'assets/europe/13.jpg',
    'assets/europe/14.jpg',
    'assets/europe/15.jpg',
    'assets/europe/16.jpg',
    'assets/europe/17.jpg',
    'assets/europe/18.jpg',
    'assets/europe/19.jpg',
    'assets/europe/20.jpg',
  ];

  // Scrolling Parameters
  throttle = 2000;
  scrollDistance = 1;
  pageSize = 20;
  pageCounter = 1;


  /* Product Table Params */
  displayedColumns: string[] = [ 'category', 'name', 'description', 'price', 'action'];
  tableLength = 100;
  tablePageSize = 20;
  tablePageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private restService: RestService, private snackBar: MatSnackBar, 
    private router: Router,private authService: AuthService, private renderer: Renderer2,
    private lightbox: CrystalLightbox){
    this.getProduct(this.pageCounter);
    this.getCategories();
  }

  ngAfterViewInit() {
  }

  onScrollDown(){
    console.log("On Scroll!" + this.pageCounter);
    this.pageCounter += 1;
    this.getProduct(this.pageCounter);
  }

  searchItems(){
    this.pageCounter = 1;
    this.productDataSource = [];
    this.getProduct(this.pageCounter);
  }

  getProduct(page){
    console.log("GetProduct!" + this.pageCounter);
    this.showSpinner = true;
    this.restService.get('product?search=' + this.searchTerm + '&page=' + page + '&size=' + this.pageSize).subscribe((data : any) => {
       data.forEach( (item, index) => {
        let catg : string = item.category;
        item.image = this.Images[index%this.Images.length];
        item.preview = this.Images[index%this.Images.length];
        item.path = this.Images[index%this.Images.length];
        this.productDataSource.push(item);
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