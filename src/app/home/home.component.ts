

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products:any
  @ViewChild('closepop') marshallPopup: any;
  categories = ['Electronics', 'Clothing', 'Books', 'Toys'];
  minPrice = 0;
  maxPrice = 1000;
  priceRange = 500;
  filteredProducts: any[] = [];
  selectedCategories: string[] = [];







  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.apiService.getProduct().subscribe((res:any)=>{
      this.products=res.products
      this.filteredProducts = this.products
      console.log(res,"hgjgh");

    })
  }

  addToCart(ite:any){
    let data={
      "productId":ite._id,
      "quantity":1,
      "price":ite.price
    }
    this.apiService.addToCart(data).subscribe((res:any)=>{
      console.log(res);
    })
  }

  getvalue(data:any){

  }

  applyFilters() {
    console.log( this.selectedCategories," this.selectedCategories");

    this.filteredProducts = this.products.filter((product:any) => {
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category);
      const matchesPrice = product.price >= this.minPrice && product.price <= this.maxPrice;
      return matchesCategory && matchesPrice;
    });

    this.marshallPopup.nativeElement.click();
    console.log('Filters applied:', this.filteredProducts);
  }

  clearFilters() {
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.priceRange = 500;
    this.selectedCategories = [];
    this.filteredProducts = [...this.products];
    console.log('Filters cleared');
  }

}
