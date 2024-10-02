import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

 

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
       
        console.log('Registration successful, token stored.');
      }
    })
  );
}

// Register a donor
registerDonor(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register/donor`, data).pipe(
    tap((response: any) => {
      if (response.access_token) {
        this.storeToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user)); 
        console.log('Donor registration successful, token and user data stored.');
        this.loggedIn.next(true);
      }
    }),
    catchError((error) => {
      console.error('Error during donor registration:', error);
      return throwError(error);
    })
  );
}


registerVolunteer(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register/volunteer`, data).pipe(
      tap((response: any) => {
          if (response.access_token) {
              this.storeToken(response.access_token);
              localStorage.setItem('user', JSON.stringify(response.user)); 
              console.log('Volunteer registration successful, token and user data stored.');
              this.loggedIn.next(true);
          }
      }),
      catchError((error) => {
          console.error('Error during volunteer registration:', error);
          return throwError(error);
      })
  );
}




  
  

 
  logout(): Observable<any> {
    const token = this.getToken();
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
        this.removeToken(); 
        this.loggedIn.next(false);
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(error);
      })
    );
  }
  


  // Metho
  private getToken(): string | null {
    return localStorage.getItem('auth_token'); 
  }


  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

 
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
