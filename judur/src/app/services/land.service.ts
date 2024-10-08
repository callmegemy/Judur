import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class LandService {
  private apiUrl = 'http://127.0.0.1:8000/api/lands';

  constructor(private http: HttpClient) {}

  getLands(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
}
