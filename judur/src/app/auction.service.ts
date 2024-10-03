// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuctionService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private apiUrl = 'http://localhost:8000/api/auctions'; // رابط الـ API من Laravel

  constructor(private http: HttpClient) { }

  // لجلب كل المزادات
  getAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // لجلب مزاد واحد
  getAuctionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // لإنشاء مزاد جديد
  createAuction(auctionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auctionData);
  }

  // لتعديل مزاد
  updateAuction(id: number, auctionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, auctionData);
  }

  // لحذف مزاد
  deleteAuction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
