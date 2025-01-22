import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  products:any
  image: any;
  @ViewChild('closepop') marshallPopup: any;


  // productForm: FormGroup ;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getProduct()

  }
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('')
  });
  getBannerImage(event: Event): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length) {
    //   this.bannerImg = input.files[0];
    // }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      // If the file passes both checks
      this.image = file;
    }
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      let data={
        name:this.productForm.value.name,
        description:'',
        price:Number(this.productForm.value.price),
        size:"s",
        category:this.productForm.value.category 
      }
      this.apiService.addProduct(data,this.image,).subscribe((res:any)=>{
        Swal.fire({
          text:"Added Successfully!",
          timer:1000
        });
        this.productForm.reset()
        this.marshallPopup.nativeElement.click();
        this.getProduct()
      })
    } else {
      console.log('Form is not valid!');
    }
  }



  openModal(): void {
    // this.dialog.open(ProductFormComponent, {
    //   width: '400px',
    //   data: { form: this.productForm },
    // });
  }

  closeModal(): void {
    // this.dialog.closeAll(); // Close modal
  }

  getProduct(){
    this.apiService.getProduct().subscribe((res:any)=>{
      this.products=res.products
      console.log(res,"hgjgh");

    })
  }

}
