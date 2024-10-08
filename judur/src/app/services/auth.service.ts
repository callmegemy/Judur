import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

export interface FinancialDonation {
  amount: number;
  currency: string;
  created_at: string;
  payment_method: string; 
  donor_name: string;     
}

export interface ItemDonation {
  item_name: string;
  value: number;
  created_at: string;
  condition: string;     
}

export interface LandDonation {
  description: string;
  land_size: number;
  created_at: string;
  address: string;      
  proof_of_ownership: string; 
}

export interface DonationHistory {
  name: string;
  totalDonations: number;
  lastDonationDate: string;
  donations: {
    financial: FinancialDonation[];
    items: ItemDonation[];
    land: LandDonation[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}
  donationDetails: ItemDonation | null = null;

  public hasToken(): boolean {
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
  getCurrentUser(): any {
    return this.getUserData();
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


public isExaminer(): boolean {
  const user = this.getUserData();
  console.log('User data in isExaminer:', user); 

  if (user && user.role_id === 3 && user.examiner === 1) {
    console.log('User is an examiner');
    return true;
  }
  console.log('User is NOT an examiner');
  return false;
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
  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }


  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }


  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  
  donateLand(formData: FormData): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Use the correct token key
      'Accept': 'application/json'
    };

    return this.http.post(`${this.apiUrl}/donate-land`, formData, { headers });
  }


  donateMoney(data: any): Observable<any> {
    const token = this.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };


    
    return this.http.post(`${this.apiUrl}/donate-money`, data, { headers }).pipe(
      tap((response) => {
        console.log('Money donation response:', response);
      }),
      catchError((error) => {
        console.error('Error donating money:', error);
        return throwError(error);
      })
    );
  }
    
  // auth.service.ts
startPaypalPayment(data: any): Observable<any> {
  const token = this.getToken(); // Get the token from local storage
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };

  return this.http.post(`${this.apiUrl}/payment/create`, data, { headers }).pipe(
    tap((response: any) => {
      console.log('PayPal payment initiated:', response);
      window.location.href = response.approvalUrl; // Redirect to PayPal approval URL
    }),
    catchError((error) => {
      console.error('Error initiating PayPal payment:', error);
      return throwError(error);
    })
  );
}

  
initiatePaypalPayment(donationData: any): Observable<any> {
  const token = this.getToken(); // Get the token from local storage
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };

  return this.http.post(`${this.apiUrl}/payment/create`, donationData, { headers }).pipe(
    tap((response: any) => {
      console.log('PayPal payment initiated:', response);
    }),
    catchError((error) => {
      console.error('Error initiating PayPal payment:', error);
      return throwError(error);
    })
  );
}
checkExaminerRequest(): Observable<any> {
  return this.http.get('http://localhost:8000/api/volunteer/check-examiner-request', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
}
requestExaminer(formData: any): Observable<any> {
  return this.http.post('http://localhost:8000/api/volunteer/request-examiner', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      Accept: 'application/json'
    }
  });
}

}
