import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  private baseUrl = 'http://localhost:8000/api/dashboard/auctions';

  constructor(private http: HttpClient) { }

  getAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/auctions`);
  }

  getAuctionDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/auctions/${id}`);
  }

  createAuction(auction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/dashboard/auctions`, auction);
  }

  getStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/statuses/auctions`);
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/items/auctions`); 
  }
  getAllItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/allitems/auctions`); 
  }

  getValuableItemDetails(Id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/valuableitems/itemDonation/${Id}`);
  }
  
  editAuction(auctionId: number, formData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${auctionId}`, formData);
  }

  deleteAuction(auctionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${auctionId}`);
  }
}
