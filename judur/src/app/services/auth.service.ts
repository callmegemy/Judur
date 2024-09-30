import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Your Laravel API endpoint
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token'); // Check for the correct token key
  }

 
  // Login method
// AuthService
login(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, data).pipe(
    tap((response: any) => {
      if (response.access_token) {
        this.storeToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user)); 
        console.log('Token and user data stored.');
        this.loggedIn.next(true);
      } else {
        console.error('No token received from login response.');
      }
    })
  );
}



  // Method to store token in localStorage
  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn('No user data found in localStorage.');
      return null;
    }
  
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // AuthService
register(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data).pipe(
    tap((response: any) => {
      if (response.access_token) {
        this.storeToken(response.access_token);
        // Optionally store user data
        console.log('Registration successful, token stored.');
      }
    })
  );
}

  
  

  // Logout method
  logout(): Observable<any> {
    const token = this.getToken(); // Get the token from local storage or wherever it's stored
    if (!token) {
      console.error('Token not found during logout.');
      this.loggedIn.next(false);
      return new Observable(observer => {
        observer.complete();
      });
    }
  
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        this.removeToken(); // Remove token from local storage
        this.loggedIn.next(false);
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(error);
      })
    );
  }
  


  // Method to retrieve token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token'); // Return the token from localStorage
  }

  // Method to remove the token from localStorage
  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
