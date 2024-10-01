import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://your-api-url/api/volunteer-summary';

  constructor(private http: HttpClient) { }

  getVolunteerSummary(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
