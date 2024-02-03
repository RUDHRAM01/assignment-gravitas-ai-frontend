import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'https://gravitas-ai-backend.onrender.com/api';

  constructor(private httpClient: HttpClient) {}

  Login(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user/login`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  Register(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user/register`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  createRecord(data: any): Observable<any> {
    return this.httpClient
      .post(`${this.apiUrl}/record/create`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('loginInfo')}`,
        }),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getRecords(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/record/get`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('loginInfo')}`,
        }),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteRecord(id: number): Observable<any> {
    return this.httpClient
      .delete(`${this.apiUrl}/record/delete/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('loginInfo')}`,
        }),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateRecord(id: number, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.apiUrl}/record/update/${id}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('loginInfo')}`,
        }),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
