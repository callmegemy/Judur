import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Inspection {
  examiner_id: string; // Adjust the type as necessary
  date: string; // Adjust the type if needed (Date, string, etc.)
}

export interface Report {
  id: number; // Assuming ID is a number
  description: string; // Add other fields as needed
  inspections: Inspection[]; // Assuming each report has an array of inspections
}
@Injectable({
  providedIn: 'root'
})
export class LandInspectionService {
  private apiUrl = 'http://localhost:8000/api/land-inspections';

  constructor(private http: HttpClient) { }

  getInspections(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getInspection(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createInspection(inspection: FormData): Observable<any> {
    console.log('Sending API request to:', this.apiUrl);
    console.log('Request payload:', inspection);

    return this.http.post(this.apiUrl, inspection).pipe(
      tap(
        response => console.log('API response:', response),
        error => console.error('API error:', error)
      )
    );
  }

  updateInspection(id: number, inspection: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inspection);
  }

  deleteInspection(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
