import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFrom!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      userId: ['', [Validators.required]],  // Email field with validation
      password: ['', [Validators.required]]                   // Password field with validation
    });
  }

  login(): void {
    if (this.loginFrom.valid) {
      console.log('Form is valid, attempting to login', this.loginFrom.value);  // Log form data for verification

      let data = {
        userId: this.loginFrom.value.userId,
        password: this.loginFrom.value.password
      };

      // Call the login API service method
      this.apiService.login(data).subscribe(
        (res: any) => {
          console.log('Login success', res.data.token);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId',res.data.userId)
          localStorage.setItem('role',res.data.role)
          swal.fire("Login success")
          this.router.navigateByUrl('/home')
        },
        (error) => {
          console.error('Login error', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
