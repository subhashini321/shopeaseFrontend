import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit{
  productList: any;

  constructor(private apiservice:ApiService){}



  cartItems:any

  ngOnInit(): void {
    this.getItem()
    this.getProductById()
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.addToCart(item)
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }

  }

  removeItem(item: any) {
    this.removeItem1(item.product._id)
    this.getItem()
    // this.cartItems = this.cartItems.filter((cartItem:any) => cartItem !== item);
  }

  addToCart(item:any){
    let data={
      "productId":item.product._id,
      "quantity":1,
      "price":item.price
    }
    this.apiservice.addToCart(data).subscribe((res:any)=>{
      console.log(res);
    })
  }

  getProductById(){
    this.apiservice.getProductById('').subscribe((res:any)=>{
      this.cartItems=res.data
      
    })
  }

  getItem(){
    this.apiservice.getProductfromCart().subscribe((res:any)=>{
      this.cartItems=res?.items
      })
  }
removeItem1(id:any){
  this.apiservice.removeItem(id).subscribe((res:any)=>{
    console.log(res);
    })
}

}


