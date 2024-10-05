import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExaminerReportsService {

  private apiUrl = 'http://localhost:8000/api/examiner-reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  
  getReportById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report-details/${id}`);
  }
}
