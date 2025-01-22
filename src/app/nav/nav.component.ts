import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{


  searchQuery = '';
  cartCount = 0;
  userId=localStorage.getItem("userId")
  role=localStorage.getItem("role")
  count:any
  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    this.apiService.getProductfromCart().subscribe((res:any)=>{
      console.log(res);
      this.count=res.productCount
    })
  }


  // handleSearch(): void {
  //   console.log('Search Query:', this.searchQuery);
  //   // Add logic to handle search query
  // }


}
