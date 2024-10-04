import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
