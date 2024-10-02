import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
;
;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private apiUrl = 'http://localhost:8000/api/profile'; 

  constructor(private http: HttpClient) {}

  updateProfile(userId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the error based on your application's needs
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
 
}
