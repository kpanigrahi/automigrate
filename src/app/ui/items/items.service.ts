import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// model section
import { Item } from 'src/app/shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiURL}/items`);
  }

  get(id: number): Observable<Item> {
    return this.http.get<Item>(`${environment.apiURL}/items/${id}`);
  }

  create(item: Item): Observable<Item> {
    return this.http.post<Item>(`${environment.apiURL}/items`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  update(item: Item): Observable<void> {
    return this.http.put<void>(`${environment.apiURL}/items/${item.id}`, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/items/${id}`);
  }
}
