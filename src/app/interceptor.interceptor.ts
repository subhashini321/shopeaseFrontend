// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class InterceptorInterceptor implements HttpInterceptor {

//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  private kickOutMessages = [
    'Error: No auth token',
    `"refreshToken" must be a string`,
    `Please authenticate`,
    "Access denied",
    "Invalid token"
  ];

  constructor(private router: Router, private authService: ApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem('token');
    console.log(authToken,"authToken");


    // Clone the request and attach the token if available
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    // Handle HTTP errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || this.kickOutMessages.some(msg => error.message.includes(msg))) {
          // Clear the local storage or token if necessary
          localStorage.removeItem('token');

          // Optionally, navigate the user to the login page
          this.router.navigate(['/login']);

          // You can also show a message to the user
          alert('Session expired or authentication error. Please log in again.');
        }

        // Re-throw the error so that it can be handled by other parts of the application
        return throwError(() => error);
      })
    );
  }
}
