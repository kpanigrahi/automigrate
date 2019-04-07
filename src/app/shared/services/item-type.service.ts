import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient } from '@angular/common/http';

// model section
import { ItemType } from '../models/itemType.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(`${environment.apiURL}/itemTypes`);
  }

  get(id: number): Observable<ItemType> {
    return this.http.get<ItemType>(`${environment.apiURL}/itemTypes/${id}`);
  }
}
