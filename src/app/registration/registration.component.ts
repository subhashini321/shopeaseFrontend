import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  addUser!: FormGroup;

  constructor(private userService: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.addUser = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userId: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log(this.addUser.value,"jhjhgcuyisj");

    if (this.addUser.valid) {
      this.userService.addUsers(this.addUser.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          swal.fire("Added")
          this.router.navigateByUrl('/home')
                   // Handle success (e.g., show a success message, redirect, etc.)
        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle error (e.g., show an error message)
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
