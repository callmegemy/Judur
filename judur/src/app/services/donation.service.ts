import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private dashboardUrl = 'http://localhost:8000/api/donor/dashboard';
  private financialDetailsUrl = 'http://localhost:8000/api/donor/view-details/Financial';
  private landDetailsUrl = 'http://localhost:8000/api/donor/view-details/land';
  private itemDetailsUrl = 'http://localhost:8000/api/donor/view-details/item';
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject AuthService

  // Helper method to get the authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Use AuthService to get token
    if (!token) {
      console.error('Token is missing, ensure the user is logged in.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch donation history for the donor
  getDonationHistory(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.dashboardUrl, { headers });
  }

  // Fetch financial donation details
  getFinancialDonations(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.financialDetailsUrl, { headers });
  }

  // Fetch land donation details
  getLandDonations(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.landDetailsUrl, { headers });
  }

  // Fetch item donation details
  getItemDonations(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.itemDetailsUrl, { headers });
  }
  donate(amount: number, currency: string, message?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/donate`, {
      amount,
      currency,
      message
    });
  }

  createPayment(amount: number, currency: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment`, { amount, currency });
  }
  createAuctionPayment(amount: number, currency: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-auction-payment`, { amount, currency });
  }
  

  confirmAuctionPayment(paymentData: { auction_id: number; [key: string]: any }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/confirm-auction-payment`, paymentData, { headers });
  }
  


  updateLandAvailability(landId: number, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  
    // Pass the entire data object in the body, which contains availability_time
    return this.http.put(`${this.apiUrl}/land/${landId}/availability`, data, { headers });
  }
  getLandDetails(landId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/land/${landId}`);
  }
  
  
}
