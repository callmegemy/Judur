  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class EventsService {

    private apiUrl = 'http://127.0.0.1:8000/api';
    private baseUrl = 'http://localhost:8000/api/dashboard/events';

    constructor(private http: HttpClient) { }

    getEvent(): Observable<any> {
      return this.http.get(`${this.apiUrl}/dashboard/events`);
    }

    getEventDetails(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/dashboard/events/${id}`);
    }

    createEvent(event : any): Observable<any> {
      return this.http.post(`${this.apiUrl}/dashboard/events`, event);
    }

    editEvent(eventId: number, formData: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/${eventId}`, formData);
    }

    deleteEvent(eventId: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${eventId}`);
    }

    eventForm(): Observable<any> {
      return this.http.get(`${this.apiUrl}/dashboard/events/create/form`);
    }

  }
