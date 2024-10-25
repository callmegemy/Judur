import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpcommingeventsService {

  private apiUrl = 'http://localhost:8000/api'; 
  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events`);
  }

  getEventById(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  
    return this.http.get(`${this.apiUrl}/events/${id}`, { headers });
  }
  

  joinEvent(eventId: number): Observable<any> {
    const token = localStorage.getItem('auth_token');  
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/list-event/join-event`, { event_id: eventId }, { headers });
}

  isVolunteerJoined(eventId: number, userId: number): Observable<any> {
    const token = localStorage.getItem('auth_token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  
    return this.http.get(`${this.apiUrl}/events/${eventId}/is-joined`, { headers });
  }

  

  cancelEvent(eventId: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/list-event/cancel-event/${eventId}`, { headers });
}
// checkVolunteerStatus(eventId: number): Observable<any> {
//   return this.http.get<any>(`http://localhost:8000/api/list-event/${eventId}/status`);
// }
getVolunteerProfile(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/volunteers/${userId}`); 
}
checkVolunteerStatus(eventId: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8000/api/volunteer-status/${eventId}`);
}

}
