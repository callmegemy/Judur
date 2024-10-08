import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://localhost:8000/api/dashboard/main/index'; 
  private base = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) {}

  getDonations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getPieChartData(): Observable<any> {
    return this.http.get<any>(`${this.base}/pie-chart-data`);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.base}/dashboard-data`);
  }
}
