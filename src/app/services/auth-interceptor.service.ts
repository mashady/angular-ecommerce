import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const userToken = localStorage.getItem('userToken');

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${userToken || ''}`,
    },
  });

  console.log('Authorization header added');
  console.log(clonedRequest);

  return next(clonedRequest).pipe(
    catchError((error) => {
      console.error('Request failed with error:', error);
      throw error;
    })
  );
};
