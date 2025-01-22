import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';  // <-- Import HttpClient
// import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  decodedData: any
  // private secretVal : any=environment.secretKey;
  baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  addProduct(obj: any,files:File) {

    const formData = new FormData();
    formData.append('name', obj.name);
    formData.append('price', obj.price);
    formData.append('size', obj.size);
    formData.append('category', obj.category);
    formData.append('file', files);
    formData.append('description', obj.description);
    return this.http.post(`${this.baseUrl}/product/add`, formData);
  }
  getProduct() {
    return this.http.get(`${this.baseUrl}/product/get`);
  }

  addToCart(data:any){
    return this.http.post(`${this.baseUrl}/cart/add-cart`, data);
  }

  login(data:any){
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }
  addUsers(data:any){
    return this.http.post(`${this.baseUrl}/auth/add-user`, data);
  }

  getProductById(id:any){
    return this.http.get(`${this.baseUrl}/product/get-product-byId/${id}`);
  }
  getProductfromCart(){
    return this.http.get(`${this.baseUrl}/cart/get-cart`);
  }
removeItem(id:any){
  return this.http.delete(`${this.baseUrl}/cart/remove/${id}`);
}

}
