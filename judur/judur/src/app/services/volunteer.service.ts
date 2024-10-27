import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';


export interface Land {
  id?: number;
  donor_id: number;
  description?: string;
  land_size: number;
  address: string;
  proof_of_ownership: string;
  status_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getVolunteerSummary(volunteerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer-summary/${volunteerId}`);
  }
  getVolunteerActivityOverTime(volunteerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer-activity/${volunteerId}`);
  }
  getVolunteerIdByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer/by-user/${userId}`);
  }
  getVolunteerEvents(volunteerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer-events/${volunteerId}`);
}
getExaminerLandData(volunteerId: number): Observable<any> {
  console.log(`Calling API: ${this.apiUrl}/examiner-lands/${volunteerId}`);
  return this.http.get(`${this.apiUrl}/examiner-lands/${volunteerId}`).pipe(
      tap(data => console.log('API response:', data)), // Log the API response
      catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(error);
      })
  );

}
getLandInspections(volunteerId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/land-inspections/${volunteerId}`);
}
getPendingLands(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/pending-lands`);
}

notifyLandOwner(request: { landId: any; inspectionDate: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/lands/notify-land-owners`, request);
}


  
  
}


